const express = require("express");
const rezervacijaController = require("../controllers/rezervacijaController.js");
const {checkAdministrator} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(checkAdministrator);

router.get("/", rezervacijaController.index);

router.post("/:sifra/remove", rezervacijaController.remove);

module.exports = router;