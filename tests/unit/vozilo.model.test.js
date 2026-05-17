const model = require("../../models/voziloModel");
const client = require("../../database/client");

jest.mock("../../database/client");

describe("voziloModel - unit testovi", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    describe("getById()", () => {
        test("vraća red s odgovarajućom šifrom iz tablice vozilo", async () => {
            const obj = {
                rows: [
                    {
                        sifra: 1,
                        naziv: 'BMW 3',
                        boja: 'Crna',
                        oblik: 'Sedan',
                        motor_sifra: 1,
                        guma_sifra: 1,
                        marka_sifra: 1
                    }
                ]
            };

            client.query.mockResolvedValue(obj);
    
            const result = await model.getById({ sifra: 1 });
    
            expect(result).toEqual(obj.rows[0]);
        });
    });

    describe("getMultipleByIdWithDetails()", () => {
        test("vraća redove s odgovarajućim šiframa iz tablice vozilo spojene s ostalim tablicama", async () => {
            const obj = {
                rows: [
                    {
                        sifra: 2,
                        naziv: 'Audi A6',
                        boja: 'Bijela',
                        oblik: 'Sedan',
                        motor_sifra: 3,
                        motor_naziv: 'Hybrid',
                        volumen: 1800,
                        broj_cilindara: 4,
                        konfiguracija: 'Inline',
                        guma_sifra: 1,
                        guma_naziv: 'Michelin Pilot',
                        sirina: 225,
                        omjer_visine_i_sirine: 0.45,
                        struktura: 'R',
                        velicina_kotaca: 17,
                        marka_sifra: 2,
                        marka_naziv: 'Audi',
                        rezervirano: true
                    }
                ]
            };

            client.query.mockResolvedValue(obj);

            const result = await model.getMultipleByIdWithDetails({ sifre: [2] });

            expect(result).toEqual(obj.rows);
        });
    });

    describe("getAllWithDetails()", () => {
        test("vraća sve redove iz tablice vozilo spojene s ostalim tablicama", async () => {
            const obj = {
                rows: [
                    {
                        sifra: 1,
                        naziv: 'BMW 3',
                        boja: 'Crna',
                        oblik: 'Sedan',
                        motor_sifra: 1,
                        motor_naziv: 'B48',
                        volumen: 2000,
                        broj_cilindara: 4,
                        konfiguracija: 'Inline',
                        guma_sifra: 1,
                        guma_naziv: 'Michelin Pilot',
                        sirina: 225,
                        omjer_visine_i_sirine: 0.45,
                        struktura: 'R',
                        velicina_kotaca: 17,
                        marka_sifra: 1,
                        marka_naziv: 'BMW'
                    },
                    {
                        sifra: 2,
                        naziv: 'Audi A6',
                        boja: 'Bijela',
                        oblik: 'Sedan',
                        motor_sifra: 3,
                        motor_naziv: 'Hybrid',
                        volumen: 1800,
                        broj_cilindara: 4,
                        konfiguracija: 'Inline',
                        guma_sifra: 1,
                        guma_naziv: 'Michelin Pilot',
                        sirina: 225,
                        omjer_visine_i_sirine: 0.45,
                        struktura: 'R',
                        velicina_kotaca: 17,
                        marka_sifra: 2,
                        marka_naziv: 'Audi'
                    }
                ]
            };

            client.query.mockResolvedValue(obj);
    
            const result = await model.getAllWithDetails();
    
            expect(result).toEqual(obj.rows);
        });
    });

    describe("getFilteredWithDetails()", () => {
        test("vraća filtrirane redove iz tablice vozilo spojene s ostalim tablicama", async () => {
            const obj = {
                rows: [
                    {
                        sifra: 6,
                        naziv: 'Ford Focus',
                        boja: 'Zelena',
                        oblik: 'Hatchback',
                        motor_sifra: 5,
                        motor_naziv: 'EcoBoost',
                        volumen: 1500,
                        broj_cilindara: 3,
                        konfiguracija: 'Inline',
                        guma_sifra: 6,
                        guma_naziv: 'Bridgestone Turanza',
                        sirina: 215,
                        omjer_visine_i_sirine: 0.55,
                        struktura: 'R',
                        velicina_kotaca: 16,
                        marka_sifra: 6,
                        marka_naziv: 'Ford',
                        rezervirano: true
                    }
                ]
            };

            client.query.mockResolvedValue(obj);
    
            const filters = {
                search: '',
                boja: ['Zelena'],
                search_engine: '',
                konfiguracija: 'Inline',
                minVolumen: '',
                maxVolumen: '',
                minCilindar: '',
                maxCilindar: '',
                search_tire: '',
                struktura: 'R',
                minSirina: '',
                maxSirina: '',
                minOmjer: '',
                maxOmjer: '',
                minVelicina: '',
                maxVelicina: ''
            };
    
            const result = await model.getFilteredWithDetails(filters);
    
            expect(result).toEqual(obj.rows);
        });
    });
    
    describe("getCustom()", () => {
        test("primjenjuje funkciju na sve redove iz tablice vozilo", async () => {
            const obj = {
                rows: [
                    { max: 4000 }
                ]
            };

            client.query.mockResolvedValue(obj);
    
            const result = await model.getCustom({
                func: "MAX",
                column: "volumen"
            });
    
            expect(result).toEqual(obj.rows);
        });

        test("primjenjuje DISTINCT na sve redove iz tablice vozilo", async () => {
            const obj = {
                rows: [
                    { boja: 'Zelena' }
                ]
            };

            client.query.mockResolvedValue(obj);
    
            const result = await model.getCustom({
                func: "DISTINCT",
                column: "boja"
            });
    
            expect(result).toEqual(obj.rows);
        });
    });

    describe("create()", () => {
        test("kreira redove i vraća broj kreiranih redova", async () => {
            const obj = {
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            };

            client.query.mockResolvedValue({ rowCount: 1 });
    
            const result = await model.create(obj);
    
            expect(client.query).toHaveBeenCalledWith(
                expect.stringContaining("insert into vozilo"),
                [
                    'BMW 3', 'Crna', 'Sedan', '1', '1', '1'
                ]
            );
            expect(result).toEqual(1);
        });
    });
    
    describe("update()", () => {
        test("updatea redove i šalje broj updatenih redova", async () => {
            const obj = {
                sifra: '1',
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            };
            
            client.query.mockResolvedValue({ rowCount: 1 });
    
            const result = await model.update(obj);
    
            expect(client.query).toHaveBeenCalledWith(
                expect.stringContaining("update vozilo"),
                [
                    '1', 'BMW 3', 'Crna', 'Sedan', '1', '1', '1'
                ]
            );
            expect(result).toEqual(1);
        });
    });

    describe("remove()", () => {
        test("uklanja redove i šalje broj uklonjenih redova", async () => {
            client.query.mockResolvedValue({ rowCount: 1 });
    
            const result = await model.remove({ sifra: 1 });
    
            expect(client.query).toHaveBeenCalledWith(
                expect.stringContaining("delete from vozilo"),
                [1]
            );
            expect(result).toEqual(1);
        });
    });
});