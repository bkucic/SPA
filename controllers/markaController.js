const markaService = require("../services/markaService.js");

async function index(req, res) {
    try {
        const marke = await markaService.getAllMarke();
        res.render("marke", { marke: marke });
    } catch {
        res.sendStatus(400);
    }
}

async function unosView(req, res) {
    res.render("marke_unos");
}

async function unosCreate(req, res) {
    try {
        await markaService.createMarka(req.body);
        res.redirect("/marke");
    } catch {
        res.sendStatus(400);
    }
}

async function remove(req, res) {
    try {
        const result = await markaService.removeMarka(req.params);
        req.flash("statusMessages", result.message);
        res.redirect("/marke");
    } catch {
        res.sendStatus(400);
    }
}

module.exports = {
    index,
    unosView,
    unosCreate,
    remove
};