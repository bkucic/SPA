const gumaModel = require("../models/gumaModel.js");

async function getAllGume() {
    return await gumaModel.getAll();
}

async function createGuma(data) {
    await gumaModel.create(data);
}

async function removeGuma(params) {
    const inUse = await gumaModel.checkUse(params);
    
    if (!inUse) {
        await gumaModel.remove(params);
        return { message: "Guma je uspješno izbrisana." };
    } else {
        return { message: "Guma nije izbrisana jer se koristi u nekom vozilu." };
    }
}

module.exports = {
    getAllGume,
    createGuma,
    removeGuma
};