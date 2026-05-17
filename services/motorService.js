const motorModel = require("../models/motorModel.js");
const voziloModel = require("../models/voziloModel.js");

async function getAllMotori() {
    return await motorModel.getAll();
}

async function createMotor(data) {
    await motorModel.create(data);
}

async function removeMotor(params) {
    const inUse = await motorModel.checkUse(params);
    
    if (!inUse) {
        await motorModel.remove(params);
        return { message: "Motor je uspješno izbrisan." };
    } else {
        return { message: "Motor nije izbrisan jer se koristi u nekom vozilu." };
    }
}

module.exports = {
    getAllMotori,
    createMotor,
    removeMotor
};