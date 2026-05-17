const gumaService = require("../services/gumaService.js");

async function index(req, res) {
    try {
        const gume = await gumaService.getAllGume();
        res.render("gume", { gume: gume });
    } catch {
        res.sendStatus(400);
    }
}

async function unosView(req, res) {
    res.render("gume_unos");
}

async function unosCreate(req, res) {
    try {
        await gumaService.createGuma(req.body);
        res.redirect("/gume");
    } catch {
        res.sendStatus(400);
    }
}

async function remove(req, res) {
    try {
        const result = await gumaService.removeGuma(req.params);
        req.flash("statusMessages", result.message);
        res.redirect("/gume");
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