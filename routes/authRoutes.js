const express = require("express");
const authController = require("../controllers/authController.js");

const router = express.Router();

router.get("/login", authController.loginIndex);
router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;