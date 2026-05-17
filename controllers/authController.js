const authService = require("../services/authService.js");

function loginIndex(req, res) {
    res.render("login");
}

async function login(req, res) {
    try {
        const result = await authService.login(req.body);
        
        if (!result.success) {
            return res.sendStatus(401);
        }

        req.session = {
            session: req.body.username
        };

        res.redirect("/automobili");
    } catch {
        res.sendStatus(400);
    }
}

async function logout(req, res) {
    req.session = null;
    res.redirect("/automobili");
}

module.exports = {
    loginIndex,
    login,
    logout
};