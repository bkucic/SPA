const markaModel = require("../models/markaModel.js");

async function getAllMarke() {
    return await markaModel.getAll();
}

async function createMarka(data) {
    await markaModel.create(data);
}
async function removeMarka(params) {
    const inUse = await markaModel.checkUse(params);
    
    if (!inUse) {
        await markaModel.remove(params);
        return { message: "Marka je uspješno izbrisana." };
    } else {
        return { message: "Marka nije izbrisana jer se koristi u nekom vozilu." };
    }
}
module.exports = {
    getAllMarke,
    createMarka,
    removeMarka
};