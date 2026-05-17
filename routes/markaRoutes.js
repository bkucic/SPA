const express = require("express");
const markaController = require("../controllers/markaController.js");
const {checkAdministrator} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(checkAdministrator);

router.get("/", markaController.index);

router.get("/unos", markaController.unosView);
router.post("/unos", markaController.unosCreate);

router.post("/:sifra/remove", markaController.remove);

module.exports = router;