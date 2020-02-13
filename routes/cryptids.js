const express = require("express");
const fs = require("fs");

// Add router
const router = express.Router();

const cryptidFilePath = "./cryptids.json";

// Index - GET
router.get("/", (req, res) => {
    let cryptidData = JSON.parse(fs.readFileSync(cryptidFilePath));
    res.render("cryptids/index", { cryptids: cryptidData });
});

// New - GET route
router.get("/new", (req, res) => {
    res.render("cryptids/new");
});

// Show - GET route
router.get("/:id", (req, res) => {
    let allCryptids = JSON.parse(fs.readFileSync(cryptidFilePath));
    let index = parseInt(req.params.id);
    let currentCryptid = allCryptids[index];
    currentCryptid.id = index;
    res.render("cryptids/show", { cryptid: currentCryptid });
});

// Edit - GET Route
router.get("/edit/:id", (req, res) => {
    let allCryptids = JSON.parse(fs.readFileSync(cryptidFilePath));
    let currentCryptid = allCryptids[req.params.id];
    currentCryptid.id = req.params.id;
    res.render("cryptids/edit", { cryptid: currentCryptid });
});

// Create - POST route
router.post("/", (req, res) => {
    let allCryptids = JSON.parse(fs.readFileSync(cryptidFilePath));
    allCryptids.push(req.body);

    let cryptidString = JSON.stringify(allCryptids);
    fs.writeFileSync(cryptidFilePath, cryptidString);

    res.redirect(`/cryptids/${allCryptids.length - 1}`);
});

// Update - PUT route
router.put("/:id", (req, res) => {
    console.log(req.params.id);

    let allCryptids = JSON.parse(fs.readFileSync(cryptidFilePath));

    allCryptids[req.params.id].name = req.body.name;
    allCryptids[req.params.id].img_url = req.body.img_url;

    fs.writeFileSync(cryptidFilePath, JSON.stringify(allCryptids));
    res.redirect(`/cryptids/${req.params.id}`);
});

// Destroy - DELETE
router.delete("/:id", (req, res) => {
    let allCryptids = JSON.parse(fs.readFileSync(cryptidFilePath));

    allCryptids.splice(req.params.id, 1);
    fs.writeFileSync(cryptidFilePath, JSON.stringify(allCryptids));

    res.redirect("/cryptids");
});

module.exports = router;