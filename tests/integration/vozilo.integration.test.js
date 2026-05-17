const request = require("supertest");
const express = require("express");
const cookieSession = require("cookie-session");

const app = require("../../app");
const client = require("../../database/client");

app.use(express.json());

describe("vozilo - integracijski testovi", () => {
    beforeAll(async () => {
        app.response.render = function (view, data) {
            this.status(200).json({
                view,
                data
            });
        };
    });
    beforeEach(async () => {
        await client.query("BEGIN");
        await client.query(
            `
                truncate table administrator, guma, kupac, marka, motor, rezervacija, servis, tip_servisa, vozilo
                restart identity cascade;
            `
        );
        await client.query(
            `
                insert into administrator (korisnicko_ime, lozinka)
                values ($1, $2)
            `,
            ["test", "$2a$12$TOlCnT90.lZOQGar5mXLHOd9Io9EHAnS/eqj4lQQJxrySHhQxwaJa"]
        );
    });
    afterEach(async () => {
        await client.query("ROLLBACK")
    });

    describe("GET /automobili", () => {
        test("kupac", async () => {
            const agent = request.agent(app);

            const res = await agent.get("/automobili");

            expect(res.status).toEqual(200);
            expect(res.body.view).toEqual("automobili_kupac");
        });
        test("admin", async () => {
            const agent = request.agent(app);
            await agent.post("/login").send({
                username: "test",
                password: "test"
            }).expect(302);

            const res = await agent.get("/automobili");

            expect(res.status).toEqual(200);
            expect(res.body.view).toEqual("automobili_admin");
        });
    });

    describe("GET /automobili/unos", () => {
        test("success", async () => {
            const agent = request.agent(app);
            await agent.post("/login").send({
                username: "test",
                password: "test"
            }).expect(302);

            const res = await agent.get("/automobili/unos");

            expect(res.status).toEqual(200);
            expect(res.body.view).toEqual("automobili_unos");
        });
    });

    describe("POST /automobili/unos", () => {
        test("success", async () => {
            const agent = request.agent(app);
            await agent.post("/login").send({
                username: "test",
                password: "test"
            }).expect(302);

            await agent.post("/marke/unos").send({
                naziv: 'BMW'
            });

            await agent.post("/motori/unos").send({
                naziv: 'B48',
                volumen: 2000,
                broj_cilindara: 4,
                konfiguracija: 'Inline'
            });

            await agent.post("/gume/unos").send({
                naziv: 'Michelin Pilot',
                sirina: 225,
                omjer_visine_i_sirine: 0.45,
                struktura: 'R',
                velicina_kotaca: 17
            });

            const res = await agent.post("/automobili/unos").send({
                naziv: 'BMW M3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            });

            expect(res.status).toEqual(302);
            expect(res.headers.location).toEqual("/automobili");
        });
    });
});