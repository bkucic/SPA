const rezervacijaService = require("../services/rezervacijaService.js");

async function index(req, res) {
    try {
        const rezervacije = await rezervacijaService.getAllRezervacije();
        res.render("rezervacije", { rezervacije: rezervacije });
    } catch {
        res.sendStatus(400);
    }
}

async function remove(req, res) {
    try {
        await rezervacijaService.removeRezervacija(req.params);
        res.redirect("/rezervacije");
    } catch {
        res.sendStatus(400);
    }
}

module.exports = {
    index,
    remove
};