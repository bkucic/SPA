const voziloModel = require("../models/voziloModel.js");
const servisModel = require("../models/servisModel.js");

async function getUsporedbaData(query) {
    let vozila = [];

    if (query.sifre) {
        const arr = query.sifre.split(",");
        vozila = await voziloModel.getMultipleByIdWithDetails({ sifre: arr });
    }
    
    const servisi = await servisModel.getAll();

    return {
        vozila: vozila,
        servisi: servisi
    };
}

module.exports = {
    getUsporedbaData
};