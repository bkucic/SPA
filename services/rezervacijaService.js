const rezervacijaModel = require("../models/rezervacijaModel.js");

async function getAllRezervacije() {
    return await rezervacijaModel.getAll();
}

async function removeRezervacija(params) {
    await rezervacijaModel.remove(params);
}

module.exports = {
    getAllRezervacije,
    removeRezervacija
};