const express = require("express");
const compareController = require("../controllers/compareController.js");
const {checkKupac} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.use(checkKupac);

router.get("/", compareController.index);

module.exports = router;