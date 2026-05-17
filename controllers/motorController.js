const motorService = require("../services/motorService.js");

async function index(req, res) {
    try {
        const motori = await motorService.getAllMotori();
        res.render("motori", { motori: motori });
    } catch {
        res.sendStatus(400);
    }
}

async function unosView(req, res) {
    res.render("motori_unos");
}

async function unosCreate(req, res) {
    try {
        await motorService.createMotor(req.body);
        res.redirect("/motori");
    } catch {
        res.sendStatus(400);
    }
}

async function remove(req, res) {
    try {
        const result = await motorService.removeMotor(req.params);
        req.flash("statusMessages", result.message);
        res.redirect("/motori");
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