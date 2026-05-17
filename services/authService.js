const bcrypt = require("bcrypt");
const administratorModel = require("../models/administratorModel.js");

async function login(credentials) {
    const administrator = await administratorModel.getById(credentials);

    if (!administrator) {
        return { success: false };
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, administrator.lozinka);

    if (!isPasswordValid) {
        return { success: false };
    }

    return { success: true };
}

module.exports = {
    login
};