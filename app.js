const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
const flash = require("connect-flash");
require('dotenv').config({ quiet: true });

const authRoutes = require("./routes/authRoutes.js");
const voziloRoutes = require("./routes/voziloRoutes.js");
const markaRoutes = require("./routes/markaRoutes.js");
const rezervacijaRoutes = require("./routes/rezervacijaRoutes.js");
const gumaRoutes = require("./routes/gumaRoutes.js");
const motorRoutes = require("./routes/motorRoutes.js");
const compareRoutes = require("./routes/compareRoutes.js");

const app = express();

app.use(cookieSession({
    name: "session",
    secret: process.env.SESSION_SECRET,
    httpOnly: true,
    sameSite: "strict"
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.statusMessages = req.flash("statusMessages");
    next();
});

app.get("/", (req, res) => {
    res.redirect("/automobili");
});

app.use(authRoutes);
app.use("/automobili", voziloRoutes);
app.use("/marke", markaRoutes);
app.use("/rezervacije", rezervacijaRoutes);
app.use("/gume", gumaRoutes);
app.use("/motori", motorRoutes);
app.use("/usporedba", compareRoutes);

app.listen(3000, () => {
    console.log("Server listening on port 3000.");
});

module.exports = app;