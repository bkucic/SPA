const express = require("express");
const motorController = require("../controllers/motorController.js");
const {checkAdministrator, changeCache} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(checkAdministrator);

router.get("/", motorController.index);

router.get("/unos", motorController.unosView);
router.post("/unos", motorController.unosCreate);

router.post("/:sifra/remove", motorController.remove);

module.exports = router;