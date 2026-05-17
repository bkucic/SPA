const express = require("express");
const gumaController = require("../controllers/gumaController.js");
const {checkAdministrator} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(checkAdministrator);

router.get("/", gumaController.index);

router.get("/unos", gumaController.unosView);
router.post("/unos", gumaController.unosCreate);

router.post("/:sifra/remove", gumaController.remove);

module.exports = router;