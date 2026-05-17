const usporedbaService = require("../services/compareService.js");

async function index(req, res) {
    try {
        const data = await usporedbaService.getUsporedbaData(req.query);
        res.render("usporedba", data);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

module.exports = {
    index
};