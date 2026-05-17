const voziloService = require("../services/voziloService.js");

async function index(req, res) {
    try {
        if (req.session?.session) {
            const vozila = await voziloService.getVozilaForAdmin();
            return res.render("automobili_admin", { vozila: vozila });
        }

        const filterData = await voziloService.getFilterData(req.query);
        res.render("automobili_kupac", filterData);
    } catch (err) {
        res.sendStatus(400);
    }
}

async function unosView(req, res) {
    try {
        const podaci = await voziloService.getUnosFormData();
        res.render("automobili_unos", podaci);
    } catch {
        res.sendStatus(400);
    }
}

async function unosCreate(req, res) {
    try {
        await voziloService.createVozilo(req.body);
        res.redirect("/automobili");
    } catch {
        res.sendStatus(400);
    }
}

async function izmjenaView(req, res) {
    try {
        const podaci = await voziloService.getIzmjenaFormData(req.params);
        res.render("vozilo", podaci);
    } catch {
        res.sendStatus(400);
    }
}

async function izmjenaUpdate(req, res) {
    try {
        await voziloService.updateVozilo(req.params.sifra, req.body);
        res.redirect("/automobili");
    } catch {
        res.sendStatus(400);
    }
}

async function izmjenaRemove(req, res) {
    try {
        await voziloService.removeVozilo(req.params);
        res.redirect("/automobili");
    } catch {
        res.sendStatus(400);
    }
}

async function servisUnosView(req, res) {
    try {
        const podaci = await voziloService.getServisUnosFormData(req.params);
        res.render("servis_unos", podaci);
    } catch {
        res.sendStatus(400);
    }
}

async function servisUnosCreate(req, res) {
    try {
        await voziloService.createServis(req.params.sifra, req.body);
        res.redirect(`/automobili/${req.params.sifra}`);
    } catch {
        res.sendStatus(400);
    }
}

async function servisIzmjenaView(req, res) {
    try {
        const podaci = await voziloService.getServisIzmjenaFormData(req.params);
        res.render("servis_izmjena", podaci);
    } catch {
        res.sendStatus(400);
    }
}

async function servisIzmjenaUpdate(req, res) {
    try {
        await voziloService.updateServis(req.params.sifraServis, req.body);
        res.redirect(`/automobili/${req.params.sifra}`);
    } catch {
        res.sendStatus(400);
    }
}

async function servisIzmjenaRemove(req, res) {
    try {
        await voziloService.removeServis(req.params);
        res.redirect(`/automobili/${req.params.sifra}`);
    } catch {
        res.sendStatus(400);
    }
}

async function rezervacijaView(req, res) {
    try {
        const vozilo = await voziloService.getVoziloForRezervacija(req.params);
        res.render("vozilo_rezervacija", { vozilo: vozilo });
    } catch {
        res.sendStatus(400);
    }
}

async function rezervacijaCreate(req, res) {
    try {
        await voziloService.createRezervacija(req.params.sifra, req.body);
        res.redirect("/automobili");
    } catch {
        res.sendStatus(400);
    }
}

module.exports = {
    index,
    unosView,
    unosCreate,
    izmjenaView,
    izmjenaUpdate,
    izmjenaRemove,
    servisUnosView,
    servisUnosCreate,
    servisIzmjenaView,
    servisIzmjenaUpdate,
    servisIzmjenaRemove,
    rezervacijaView,
    rezervacijaCreate
};