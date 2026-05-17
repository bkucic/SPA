const voziloModel = require("../models/voziloModel.js");
const motorModel = require("../models/motorModel.js");
const gumaModel = require("../models/gumaModel.js");
const markaModel = require("../models/markaModel.js");
const kupacModel = require("../models/kupacModel.js");
const rezervacijaModel = require("../models/rezervacijaModel.js");
const servisModel = require("../models/servisModel.js");
const tipServisaModel = require("../models/tipServisaModel.js");

async function getVozilaForAdmin() {
    return await voziloModel.getAllWithDetails();
}

async function getFilterData(filters) {
    const vozila = await voziloModel.getFilteredWithDetails(filters);
    const boje = await voziloModel.getCustom({ func: "", column: "boja" });
    const oblici = await voziloModel.getCustom({ func: "", column: "oblik" });
    const minVol = await motorModel.getCustom({ func: "MIN", column: "volumen" });
    const maxVol = await motorModel.getCustom({ func: "MAX", column: "volumen" });
    const minCil = await motorModel.getCustom({ func: "MIN", column: "broj_cilindara" });
    const maxCil = await motorModel.getCustom({ func: "MAX", column: "broj_cilindara" });
    const konfiguracije = await motorModel.getCustom({ func: "", column: "konfiguracija" });
    const minSir = await gumaModel.getCustom({ func: "MIN", column: "sirina" });
    const maxSir = await gumaModel.getCustom({ func: "MAX", column: "sirina" });
    const minOmj = await gumaModel.getCustom({ func: "MIN", column: "omjer_visine_i_sirine" });
    const maxOmj = await gumaModel.getCustom({ func: "MAX", column: "omjer_visine_i_sirine" });
    const minVel = await gumaModel.getCustom({ func: "MIN", column: "velicina_kotaca" });
    const maxVel = await gumaModel.getCustom({ func: "MAX", column: "velicina_kotaca" });
    const strukture = await gumaModel.getCustom({ func: "", column: "struktura" });
    const servisi = await servisModel.getAll();

    return {
        vozila: vozila,
        boje: boje,
        oblici: oblici,
        volumeni: { min: minVol[0].min, max: maxVol[0].max },
        cilindri: { min: minCil[0].min, max: maxCil[0].max },
        konfiguracije: konfiguracije,
        sirine: { min: minSir[0].min, max: maxSir[0].max },
        omjeri: { min: minOmj[0].min, max: maxOmj[0].max },
        velicine: { min: minVel[0].min, max: maxVel[0].max },
        strukture: strukture,
        servisi: servisi,
        filters: filters
    };
}

async function getUnosFormData() {
    const motori = await motorModel.getAll();
    const gume = await gumaModel.getAll();
    const marke = await markaModel.getAll();
    
    return { motori: motori, gume: gume, marke: marke };
}

async function createVozilo(data) {
    await voziloModel.create(data);
}

async function getIzmjenaFormData(params) {
    const vozilo = await voziloModel.getById(params);
    const rezervacije = await rezervacijaModel.getMultipleByVehicleId(params);
    const motori = await motorModel.getAll();
    const gume = await gumaModel.getAll();
    const marke = await markaModel.getAll();
    const servisi = await servisModel.getMultipleByVehicleIdWithDetails(params);

    return {
        vozilo: vozilo,
        postojeRezervacije: rezervacije.length > 0,
        motori: motori,
        gume: gume,
        marke: marke,
        servisi: servisi
    };
}

async function updateVozilo(sifra, data) {
    const motor = await motorModel.getByVehicleId(data);
    const guma = await gumaModel.getByVehicleId(data);

    if((motor.volumen > 2000 || motor.broj_cilindara > 4) && !(guma.sirina > 235 && guma.struktura === "R"))
    {
        throw new Error("Odabrani motor i gume nisu kompatibilni");
    }

    data.sifra = sifra;

    const rezervacije = await rezervacijaModel.getMultipleByVehicleId(data);
    const vozilo = await voziloModel.getById(data);

    if(rezervacije.length > 0 && (data.naziv != vozilo.naziv || data.boja != vozilo.boja || data.oblik != vozilo.oblik || data.motor_sifra != `${vozilo.motor_sifra}` || data.marka_sifra != vozilo.marka_sifra))
    {
        throw new Error("Rezerviranom vozilu se mogu promijeniti samo gume");
    }

    await voziloModel.update(data);
}

async function removeVozilo(params) {
    await voziloModel.remove(params);
}

async function getServisUnosFormData(params) {
    const vozilo = await voziloModel.getById(params);
    const tipoviServisa = await tipServisaModel.getAll();
    
    return { vozilo: vozilo, tipovi_servisa: tipoviServisa };
}

function validateDatum(datum, smjer) {
    const [godina, mjesec, dan] = datum.split("-").map(Number);

    // lokalni
    const datumObj = new Date(godina, mjesec - 1, dan);

    // danasnji lokalni 
    const today = new Date();
    const localToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    //console.log(localToday);
    //console.log(datumObj);

    if (smjer === "prije" && datumObj > localToday) {
        throw new Error("Datum ne može biti u budućnosti");
    } 
    else if (smjer === "poslije" && datumObj < localToday) {
        throw new Error("Datum ne može biti u prošlosti");
    }

    return true;
}

async function createServis(voziloSifra, data) {
    validateDatum(data.datum, "prije");
    data.vozilo_sifra = voziloSifra;
    await servisModel.create(data);
}

async function getServisIzmjenaFormData(params) {
    const servis = await servisModel.getById(params);
    const tipoviServisa = await tipServisaModel.getAll();
    
    return {
        vozilo: { sifra: params.sifra },
        servis: servis,
        tipovi_servisa: tipoviServisa
    };
}

async function updateServis(sifraServis, data) {
    validateDatum(data.datum, "prije");
    data.sifraServis = sifraServis;
    await servisModel.update(data);
}

async function removeServis(params) {
    await servisModel.remove(params);
}

async function getVoziloForRezervacija(params) {
    return await voziloModel.getById(params);
}

async function createRezervacija(voziloSifra, data) {
    data.sifra = voziloSifra;
    const rezervacije = await rezervacijaModel.getMultipleByVehicleId(data);

    if(rezervacije.length != 0)
    {
        throw new Error("Automobil ne može biti rezerviran više puta");
    }

    validateDatum(data.datum, "poslije");
    await kupacModel.create(data);
    await rezervacijaModel.create(data);
}

module.exports = {
    getVozilaForAdmin,
    getFilterData,
    getUnosFormData,
    createVozilo,
    getIzmjenaFormData,
    updateVozilo,
    removeVozilo,
    getServisUnosFormData,
    createServis,
    getServisIzmjenaFormData,
    updateServis,
    removeServis,
    getVoziloForRezervacija,
    createRezervacija
};