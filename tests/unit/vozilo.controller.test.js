const controller = require("../../controllers/voziloController");
const voziloService = require("../../services/voziloService");

jest.mock("../../services/voziloService");

describe("vozilo controller - unit testovi", () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            session: {},
            query: {},
            params: {},
            body: {}
        };

        res = {
            render: jest.fn(),
            redirect: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    describe("index()", () => {
        test("admin view kad ulogiran", async () => {
            req.session.session = true;

            const obj = [
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
            ];

            voziloService.getVozilaForAdmin.mockResolvedValue(obj);

            await controller.index(req, res);

            expect(voziloService.getVozilaForAdmin).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith(
                "automobili_admin",
                { vozila: obj }
            );
        });

        test("kupac view kad nije ulogiran", async () => {
            const obj = {
                vozila: [
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
                    }
                ],
                boje: [
                    { boja: 'Crna' }
                ],
                oblici: [
                    { oblik: 'Sedan' }
                ],
                volumeni: { min: 1200, max: 4000 },
                cilindri: { min: 3, max: 8 },
                konfiguracije: [ { konfiguracija: 'V' }, { konfiguracija: 'Inline' } ],
                sirine: { min: 195, max: 265 },
                omjeri: { min: 0.3, max: 0.65 },
                velicine: { min: 15, max: 20 },
                strukture: [ { struktura: 'R' } ],
                servisi: [
                    {
                    sifra: 2,
                    datum: "2026-05-13",
                    vozilo_sifra: 2,
                    tip_servisa_sifra: 2,
                    naziv: 'Veliki servis'
                    }
                ],
                filters: req.query
            };

            voziloService.getFilterData.mockResolvedValue(obj);

            await controller.index(req, res);

            expect(voziloService.getFilterData).toHaveBeenCalledWith(req.query);
            expect(res.render).toHaveBeenCalledWith(
                "automobili_kupac",
                obj
            );
        });

        test("error i 400", async () => {
            voziloService.getFilterData.mockRejectedValue(new Error());

            await controller.index(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("unosView()", () => {
        test("unos view", async () => {
            const obj = {
                motori: [
                    {
                      naziv: 'B48',
                      volumen: 2000,
                      broj_cilindara: 4,
                      konfiguracija: 'Inline',
                      sifra: 1
                    }
                ],
                gume: [
                    {
                      naziv: 'Michelin Pilot',
                      sirina: 225,
                      omjer_visine_i_sirine: 0.45,
                      struktura: 'R',
                      velicina_kotaca: 17,
                      sifra: 1
                    }
                ],
                marke: [
                    { sifra: 1, naziv: 'BMW' }
                ]
            };

            voziloService.getUnosFormData.mockResolvedValue(obj);

            await controller.unosView(req, res);

            expect(voziloService.getUnosFormData).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith(
                "automobili_unos",
                obj
            );
        });

        test("error i 400", async () => {
            voziloService.getUnosFormData.mockRejectedValue(new Error());

            await controller.unosView(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("unosCreate()", () => {
        test("kreira vozilo i redirect", async () => {
            req.body = {
                naziv: 'BMW M3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            };

            voziloService.createVozilo.mockResolvedValue(1);

            await controller.unosCreate(req, res);

            expect(voziloService.createVozilo).toHaveBeenCalledWith(req.body);
            expect(res.redirect).toHaveBeenCalledWith("/automobili");
        });

        test("error i 400", async () => {
            voziloService.createVozilo.mockRejectedValue(new Error());

            await controller.unosCreate(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("izmjenaView()", () => {
        test("izmjena view", async () => {
            const obj = {
                vozilo: {
                    sifra: 1,
                    naziv: 'BMW 3',
                    boja: 'Crna',
                    oblik: 'Sedan',
                    motor_sifra: 1,
                    guma_sifra: 1,
                    marka_sifra: 1
                },
                postojeRezervacije: true,
                motori: [
                    {
                        naziv: 'B48',
                        volumen: 2000,
                        broj_cilindara: 4,
                        konfiguracija: 'Inline',
                        sifra: 1
                    }
                ],
                gume: [
                    {
                        naziv: 'Michelin Pilot',
                        sirina: 225,
                        omjer_visine_i_sirine: 0.45,
                        struktura: 'R',
                        velicina_kotaca: 17,
                        sifra: 1
                    }
                ],
                marke: [
                    { sifra: 1, naziv: 'BMW' }
                ],
                servisi: []
            };

            voziloService.getIzmjenaFormData.mockResolvedValue(obj);

            await controller.izmjenaView(req, res);

            expect(voziloService.getIzmjenaFormData).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith(
                "vozilo",
                obj
            );
        });

        test("error i 400", async () => {
            voziloService.getIzmjenaFormData.mockRejectedValue(new Error());

            await controller.izmjenaView(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("izmjenaUpdate()", () => {
        test("updatea vozilo i redirect", async () => {
            req.params.sifra = 1;
            req.body = {
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1',
                sifra: '1'
            };

            voziloService.updateVozilo.mockResolvedValue();

            await controller.izmjenaUpdate(req, res);

            expect(voziloService.updateVozilo).toHaveBeenCalledWith(req.params.sifra, req.body);

            expect(res.redirect).toHaveBeenCalledWith("/automobili");
        });

        test("error i 400", async () => {
            voziloService.updateVozilo.mockRejectedValue(new Error());

            await controller.izmjenaUpdate(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("izmjenaRemove()", () => {
        test("uklanja vozilo i redirect", async () => {
            req.params.sifra = 1;

            voziloService.removeVozilo.mockResolvedValue();

            await controller.izmjenaRemove(req, res);

            expect(voziloService.removeVozilo).toHaveBeenCalledWith(req.params);

            expect(res.redirect).toHaveBeenCalledWith("/automobili");
        });
    });

    describe("servisUnosView()", () => {
        test("unos servisa view", async () => {
            req.params.sifra = 1;
            const obj = {
                vozilo: {
                    sifra: 1,
                    naziv: 'BMW 3',
                    boja: 'Crna',
                    oblik: 'Sedan',
                    motor_sifra: 1,
                    guma_sifra: 1,
                    marka_sifra: 1
                },
                tipovi_servisa: [
                    { sifra: 1, naziv: 'Mali servis' }
                ]
            };

            voziloService.getServisUnosFormData.mockResolvedValue(obj);

            await controller.servisUnosView(req, res);

            expect(voziloService.getServisUnosFormData).toHaveBeenCalledWith(req.params);
            expect(res.render).toHaveBeenCalledWith(
                "servis_unos",
                obj
            );
        });

        test("error i 400", async () => {
            voziloService.getServisUnosFormData.mockRejectedValue(new Error());

            await controller.servisUnosView(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("servisUnosCreate()", () => {
        test("kreira servis i redirect", async () => {
            req.params.sifra = 1;
            req.body = {
                tip_sifra: '1',
                datum: '2026-05-16',
                vozilo_sifra: '1'
            };

            voziloService.createServis.mockResolvedValue();

            await controller.servisUnosCreate(req, res);

            expect(voziloService.createServis).toHaveBeenCalledWith(req.params.sifra, req.body);

            expect(res.redirect).toHaveBeenCalledWith(`/automobili/${req.params.sifra}`);
        });

        test("error i 400", async () => {
            voziloService.createServis.mockRejectedValue(new Error());

            await controller.servisUnosCreate(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("servisIzmjenaView()", () => {
        test("izmjena servisa view", async () => {
            req.params = { sifra: '1', sifraServis: '1' };
            const obj = {
                vozilo: { sifra: '1' },
                servis: {
                    sifra: 1,
                    datum: "2026-05-15",
                    vozilo_sifra: 1,
                    tip_servisa_sifra: 1
                }
            };

            voziloService.getServisIzmjenaFormData.mockResolvedValue(obj);

            await controller.servisIzmjenaView(req, res);

            expect(voziloService.getServisIzmjenaFormData).toHaveBeenCalledWith(req.params);
            expect(res.render).toHaveBeenCalledWith(
                "servis_izmjena",
                obj
            );
        });

        test("error i 400", async () => {
            voziloService.getServisIzmjenaFormData.mockRejectedValue(new Error());

            await controller.servisIzmjenaView(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("servisIzmjenaUpdate()", () => {
        test("updatea servis i redirect", async () => {
            req.params = { sifra: 1, sifraServis: 1 };

            voziloService.updateServis.mockResolvedValue();

            await controller.servisIzmjenaUpdate(req, res);

            expect(voziloService.updateServis).toHaveBeenCalledWith(req.params.sifraServis, req.body);

            expect(res.redirect).toHaveBeenCalledWith(`/automobili/${req.params.sifra}`);
        });
    });

    describe("servisIzmjenaRemove()", () => {
        test("uklanja servis i redirect", async () => {
            req.params = { sifra: 1 };

            voziloService.removeServis.mockResolvedValue();

            await controller.servisIzmjenaRemove(req, res);

            expect(voziloService.removeServis).toHaveBeenCalledWith(req.params);

            expect(res.redirect).toHaveBeenCalledWith(`/automobili/${req.params.sifra}`);
        });
    });

    describe("rezervacijaView()", () => {
        test("rezervacija view", async () => {
            req.params.sifra = '6';
            const obj = {
                sifra: 6,
                naziv: 'Ford Focus',
                boja: 'Zelena',
                oblik: 'Hatchback',
                motor_sifra: 5,
                guma_sifra: 6,
                marka_sifra: 6
            };

            voziloService.getVoziloForRezervacija.mockResolvedValue(obj);

            await controller.rezervacijaView(req, res);

            expect(voziloService.getVoziloForRezervacija).toHaveBeenCalledWith(req.params);
            expect(res.render).toHaveBeenCalledWith(
                "vozilo_rezervacija",
                { vozilo: obj }
            );
        });

        test("error i 400", async () => {
            voziloService.getVoziloForRezervacija.mockRejectedValue(new Error());

            await controller.rezervacijaView(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("rezervacijaCreate()", () => {
        test("kreira rezervaciju i redirect", async () => {
            req.params.sifra = 4;
            req.body = {
                ime: 'Ime',
                prezime: 'Prezime',
                oib: '11111111111',
                adresa: 'Adresa',
                datum: '2026-05-28'
            }

            voziloService.createRezervacija.mockResolvedValue();

            await controller.rezervacijaCreate(req, res);

            expect(voziloService.createRezervacija).toHaveBeenCalledWith(req.params.sifra, req.body);

            expect(res.redirect).toHaveBeenCalledWith("/automobili");
        });

        test("error i 400", async () => {
            voziloService.createRezervacija.mockRejectedValue(new Error());

            await controller.rezervacijaCreate(req, res);

            expect(res.sendStatus).toHaveBeenCalledWith(400);
        });
    });
});