const service = require("../../services/voziloService");
const voziloModel = require("../../models/voziloModel");
const motorModel = require("../../models/motorModel");
const gumaModel = require("../../models/gumaModel");
const markaModel = require("../../models/markaModel");
const kupacModel = require("../../models/kupacModel");
const rezervacijaModel = require("../../models/rezervacijaModel");
const servisModel = require("../../models/servisModel");
const tipServisaModel = require("../../models/tipServisaModel");

jest.mock("../../models/voziloModel");
jest.mock("../../models/motorModel");
jest.mock("../../models/gumaModel");
jest.mock("../../models/markaModel");
jest.mock("../../models/kupacModel");
jest.mock("../../models/rezervacijaModel");
jest.mock("../../models/servisModel");
jest.mock("../../models/tipServisaModel");

describe("voziloService - unit testovi", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe("getVozilaForAdmin()", () => {
        test("vraća sva vozila", async () => {
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

            voziloModel.getAllWithDetails.mockResolvedValue(obj);

            const result = await service.getVozilaForAdmin();

            expect(voziloModel.getAllWithDetails).toHaveBeenCalled();
            expect(result).toEqual(obj);
        });
    });

    describe("getFilterData()", () => {
        test("vraća filtrirana vozila sa servisima i korištene filtere", async () => {
            const vozila = [
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
            ];
            const boje = [
                { boja: 'Zelena' }
            ];
            const konfiguracije = [
                { konfiguracija: 'Inline' }
            ];
            const strukture = [
                { struktura: 'R' }
            ];
            const servisi = [
                {
                    sifra: 2,
                    datum: "2026-05-13",
                    vozilo_sifra: 2,
                    tip_servisa_sifra: 2,
                    naziv: 'Veliki servis'
                }
            ];

            voziloModel.getFilteredWithDetails.mockResolvedValue(vozila);
            voziloModel.getCustom.mockResolvedValue(boje);
            motorModel.getCustom.mockResolvedValue(konfiguracije);
            gumaModel.getCustom.mockResolvedValue(strukture);
            servisModel.getAll.mockResolvedValue(servisi);

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

            const result = await service.getFilterData(filters);

            expect(result).toEqual(
                {
                    vozila: vozila,
                    boje: boje,
                    oblici: expect.any(Object),
                    volumeni: expect.any(Object),
                    cilindri: expect.any(Object),
                    konfiguracije: konfiguracije,
                    sirine: expect.any(Object),
                    omjeri: expect.any(Object),
                    velicine: expect.any(Object),
                    strukture: strukture,
                    servisi: servisi,
                    filters: filters
                }
            );
        });
    });

    describe("getUnosFormData()", () => {
        test("vraća sve motore, gume i marke", async () => {
            const motori = [
                {
                    naziv: 'B48',
                    volumen: 2000,
                    broj_cilindara: 4,
                    konfiguracija: 'Inline',
                    sifra: 1
                }
            ];
            const gume = [
                {
                    naziv: 'Michelin Pilot',
                    sirina: 225,
                    omjer_visine_i_sirine: 0.45,
                    struktura: 'R',
                    velicina_kotaca: 17,
                    sifra: 1
                }
            ];
            const marke = [
                { sifra: 1, naziv: 'BMW' }
            ];

            motorModel.getAll.mockResolvedValue(motori);
            gumaModel.getAll.mockResolvedValue(gume);
            markaModel.getAll.mockResolvedValue(marke);

            const result = await service.getUnosFormData();

            expect(result).toEqual({
                motori: motori,
                gume: gume,
                marke: marke
            });
        });
    });

    describe("createVozilo()", () => {
        test("kreira vozilo", async () => {
            const obj = {
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            };

            voziloModel.create.mockResolvedValue();

            await service.createVozilo(obj);

            expect(voziloModel.create).toHaveBeenCalledWith({
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                marka_sifra: '1',
                motor_sifra: '1',
                guma_sifra: '1'
            });
        });
    });

    describe("getIzmjenaFormData()", () => {
        test("vraća vozilo s detaljima", async () => {
            const vozilo = {
                sifra: 1,
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                motor_sifra: 1,
                guma_sifra: 1,
                marka_sifra: 1
            };
            const rezervacije = [
                { '?column?': 1 }
            ];
            const motori = [
                {
                    naziv: 'B48',
                    volumen: 2000,
                    broj_cilindara: 4,
                    konfiguracija: 'Inline',
                    sifra: 1
                }
            ];
            const gume = [
                {
                    naziv: 'Michelin Pilot',
                    sirina: 225,
                    omjer_visine_i_sirine: 0.45,
                    struktura: 'R',
                    velicina_kotaca: 17,
                    sifra: 1
                }
            ];
            const marke = [
                { sifra: 1, naziv: 'BMW' }
            ];
            const servisi = [
                {
                    sifra: 4,
                    datum: "2026-05-15",
                    vozilo_sifra: 1,
                    tip_servisa_sifra: 2,
                    tip_servisa_naziv: 'Veliki servis'
                }
            ];

            voziloModel.getById.mockResolvedValue(vozilo);
            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue(rezervacije);
            motorModel.getAll.mockResolvedValue(motori);
            gumaModel.getAll.mockResolvedValue(gume);
            markaModel.getAll.mockResolvedValue(marke);
            servisModel.getMultipleByVehicleIdWithDetails.mockResolvedValue(servisi);

            const result = await service.getIzmjenaFormData({ sifra: 1 });

            expect(result).toEqual(
                {
                    vozilo: vozilo,
                    postojeRezervacije: rezervacije.length > 0,
                    motori: motori,
                    gume: gume,
                    marke: marke,
                    servisi: servisi
                }
            );
        });
    });

    describe("updateVozilo()", () => {
        test("updatea vozilo ako ima kompatibilne dijelove i nisu napravljene nedopuštene promjene", async () => {
            const motor = {
                naziv: 'i-VTEC',
                volumen: 2000,
                broj_cilindara: 4,
                konfiguracija: 'Inline',
                sifra: 6
            };
            const guma = {
                naziv: 'Pirelli P Zero',
                sirina: 245,
                omjer_visine_i_sirine: 0.4,
                struktura: 'R',
                velicina_kotaca: 18,
                sifra: 2
            };
            const vozilo = {
                sifra: 7,
                naziv: 'Honda Civic',
                boja: 'Crna',
                oblik: 'Sedan',
                motor_sifra: 6,
                guma_sifra: 7,
                marka_sifra: 7
            };
            const rezervacije = [];
            const novoVozilo = {
                sifra: 7,
                naziv: 'Honda Civic',
                boja: 'Zelena',
                oblik: 'Sedan',
                motor_sifra: 6,
                guma_sifra: 7,
                marka_sifra: 7
            };

            motorModel.getByVehicleId.mockResolvedValue(motor);
            gumaModel.getByVehicleId.mockResolvedValue(guma);
            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue(rezervacije);
            voziloModel.getById.mockResolvedValue(vozilo);

            await service.updateVozilo(7, novoVozilo);

            expect(voziloModel.update).toHaveBeenCalledWith(novoVozilo);
        });
        test("error ako vozila ima nekompatibilne dijelove", async () => {
            const motor = {
                naziv: 'V6 TDI',
                volumen: 3000,
                broj_cilindara: 6,
                konfiguracija: 'V',
                sifra: 2
            };
            const guma = {
                naziv: 'Goodyear Eagle',
                sirina: 235,
                omjer_visine_i_sirine: 0.45,
                struktura: 'R',
                velicina_kotaca: 17,
                sifra: 4
            };
            const novoVozilo = {
                sifra: 7,
                naziv: 'Honda Civic',
                boja: 'Zelena',
                oblik: 'Sedan',
                motor_sifra: 2,
                guma_sifra: 4,
                marka_sifra: 7
            };

            motorModel.getByVehicleId.mockResolvedValue(motor);
            gumaModel.getByVehicleId.mockResolvedValue(guma);

            await expect(service.updateVozilo(7, novoVozilo)).rejects.toThrow("Odabrani motor i gume nisu kompatibilni");
        });
        test("error ako su napravljene nedopuštene promjene", async () => {
            const motor = {
                naziv: 'i-VTEC',
                volumen: 2000,
                broj_cilindara: 4,
                konfiguracija: 'Inline',
                sifra: 6
            };
            const guma = {
                naziv: 'Pirelli P Zero',
                sirina: 245,
                omjer_visine_i_sirine: 0.4,
                struktura: 'R',
                velicina_kotaca: 18,
                sifra: 2
            };
            const vozilo = {
                sifra: 7,
                naziv: 'Honda Civic',
                boja: 'Crna',
                oblik: 'Sedan',
                motor_sifra: 6,
                guma_sifra: 7,
                marka_sifra: 7
            };
            const rezervacije = [
                { '?column?': 1 }
            ];
            const novoVozilo = {
                sifra: 7,
                naziv: 'Honda Civic',
                boja: 'Zelena',
                oblik: 'Sedan',
                motor_sifra: 6,
                guma_sifra: 7,
                marka_sifra: 7
            };

            motorModel.getByVehicleId.mockResolvedValue(motor);
            gumaModel.getByVehicleId.mockResolvedValue(guma);
            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue(rezervacije);
            voziloModel.getById.mockResolvedValue(vozilo);

            await expect(service.updateVozilo(7, novoVozilo)).rejects.toThrow("Rezerviranom vozilu se mogu promijeniti samo gume");
        });
    });

    describe("removeVozilo()", () => {
        test("uklanja vozilo", async () => {
            await service.removeVozilo({ sifra: 1 });

            expect(voziloModel.remove).toHaveBeenCalledWith({ sifra: 1 });
        });
    });

    describe("getServisUnosFormData()", () => {
        test("vraća vozilo i sve tipove servisa", async () => {
            const vozilo = {
                sifra: 1,
                naziv: 'BMW 3',
                boja: 'Crna',
                oblik: 'Sedan',
                motor_sifra: 1,
                guma_sifra: 1,
                marka_sifra: 1
            };
            const tipoviServisa = [
                { sifra: 1, naziv: 'Mali servis' }
            ];

            voziloModel.getById.mockResolvedValue(vozilo);
            tipServisaModel.getAll.mockResolvedValue(tipoviServisa);

            const result = await service.getServisUnosFormData({ sifra: 1 });

            expect(result).toEqual(
                {
                    vozilo: vozilo,
                    tipovi_servisa: tipoviServisa
                }
            );
        });
    });

    describe("createServis()", () => {
        test("kreira servis za prosli datum", async () => {
            const obj = {
                tip_sifra: '1',
                datum: '2020-01-01',
                vozilo_sifra: '1'
            };

            await service.createServis(1, obj);

            obj.vozilo_sifra = 1;

            expect(servisModel.create).toHaveBeenCalledWith(obj);
        });

        test("error za buduci datum", async () => {
            const obj = {
                tip_sifra: '1',
                datum: '2099-01-01',
                vozilo_sifra: '1'
            };

            await expect(service.createServis(1, obj)).rejects.toThrow("Datum ne može biti u budućnosti");
        });
    });

    describe("getServisIzmjenaFormData()", () => {
        test("vraća servis vozila i sve tipove detalja", async () => {
            const servis = {
                sifra: 1,
                datum: "2026-05-14",
                vozilo_sifra: 1,
                tip_servisa_sifra: 1
            };
            const tipoviServisa = [
                { sifra: 1, naziv: 'Mali servis' },
                { sifra: 2, naziv: 'Veliki servis' }
            ];

            servisModel.getById.mockResolvedValue(servis);
            tipServisaModel.getAll.mockResolvedValue(tipoviServisa);

            const result = await service.getServisIzmjenaFormData({ sifra: 1 });

            expect(result).toEqual(
                {
                    vozilo: { sifra: 1 },
                    servis: servis,
                    tipovi_servisa: tipoviServisa
                }
            );
        });
    });

    describe("updateServis()", () => {
        test("updatea servis za prosli datum", async () => {
            const obj = {
                tip_sifra: '1',
                datum: '2020-01-01',
                sifraServis: '1'
            };

            await service.updateServis(1, obj);

            obj.sifraServis = 1;

            expect(servisModel.update).toHaveBeenCalledWith(obj);
        });
        test("error za buduci datum", async () => {
            const obj = {
                tip_sifra: '1',
                datum: '2099-01-01',
                vozilo_sifra: '1'
            };

            await expect(service.createServis(1, obj)).rejects.toThrow("Datum ne može biti u budućnosti");
        });
    });

    describe("removeServis()", () => {
        test("uklanja servis", async () => {
            await service.removeVozilo({ sifra: 1 });

            expect(voziloModel.remove).toHaveBeenCalledWith({ sifra: 1 });
        });
    });

    describe("getVoziloForRezervacija()", () => {
        test("vraća vozilo", async () => {
            const vozilo = {
                sifra: 2,
                naziv: 'Audi A6',
                boja: 'Bijela',
                oblik: 'Sedan',
                motor_sifra: 3,
                guma_sifra: 1,
                marka_sifra: 2
            };

            voziloModel.getById.mockResolvedValue(vozilo);

            const result = await service.getVoziloForRezervacija({ sifra: 2 });

            expect(result).toEqual(vozilo);
        });
    });

    describe("createRezervacija()", () => {
        test("kreira rezervaciju za buduci datum ako je jedina", async () => {
            const obj = {
                ime: 'Ime',
                prezime: 'Prezime',
                oib: '11111111111',
                adresa: 'Adresa',
                datum: '2099-01-01',
                sifra: '1'
            };

            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue([]);

            await service.createRezervacija(1, obj);

            expect(kupacModel.create).toHaveBeenCalledWith(obj);
            expect(rezervacijaModel.create).toHaveBeenCalledWith(obj);
        });
        test("error ako nije jedina rezervacija", async () => {
            const obj = {
                ime: 'Ime',
                prezime: 'Prezime',
                oib: '11111111111',
                adresa: 'Adresa',
                datum: '2099-01-01',
                sifra: '1'
            };
            const rezervacije = [
                { '?column?': 1 }
            ];

            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue(rezervacije);

            await expect(service.createRezervacija(1, obj)).rejects.toThrow("Automobil ne može biti rezerviran više puta");
        });
        test("error za prosli datum", async () => {
            const obj = {
                ime: 'Ime',
                prezime: 'Prezime',
                oib: '11111111111',
                adresa: 'Adresa',
                datum: '2020-01-01',
                sifra: '1'
            };

            rezervacijaModel.getMultipleByVehicleId.mockResolvedValue([]);

            await expect(service.createRezervacija(1, obj)).rejects.toThrow("Datum ne može biti u prošlosti");
        });
    });
});