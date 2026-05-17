const express = require("express");
const voziloController = require("../controllers/voziloController.js");
const {checkAdministrator, checkKupac} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", voziloController.index);

router.get("/:sifra/rezerviraj", checkKupac, voziloController.rezervacijaView);
router.post("/:sifra/rezerviraj", checkKupac, voziloController.rezervacijaCreate);

router.use(checkAdministrator);

router.get("/unos", voziloController.unosView);
router.post("/unos", voziloController.unosCreate);

router.get("/:sifra/servis", voziloController.servisUnosView);
router.post("/:sifra/servis", voziloController.servisUnosCreate);

router.get("/:sifra/servis/:sifraServis", voziloController.servisIzmjenaView);
router.post("/:sifra/servis/:sifraServis", voziloController.servisIzmjenaUpdate);
router.post("/:sifra/servis/:sifraServis/remove", voziloController.servisIzmjenaRemove);

router.get("/:sifra", voziloController.izmjenaView);
router.post("/:sifra/remove", voziloController.izmjenaRemove);
router.post("/:sifra", voziloController.izmjenaUpdate);

module.exports = router;