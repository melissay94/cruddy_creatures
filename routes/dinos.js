const express = require("express");
const fs = require("fs");

// Add router
const router = express.Router();

// Index - GET route
router.get("/", (req, res) => {
    let allDinos = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(allDinos);

    res.render("dinos/index", { dinos: dinoData });
});

// New - GET route
router.get("/new", (req, res) => {
    res.render("dinos/new");
});

// Create - POST route
router.post("/", (req, res) => {
    // Read Dinos // JSON parse dinos
    let dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"));
    // Add req.body to end of dinos
    dinos.push(req.body);
    // JSON strigify dinos
    let dinoString = JSON.stringify(dinos);
    // write dinos
    fs.writeFileSync("./dinosaurs.json", dinoString);

    // TODO: redirect to show page for new dino
    res.redirect(`/dinos/${dinos.length-1}`);
});

// Show - GET route
router.get("/:id", (req, res) => {
    let allDinos = JSON.parse(fs.readFileSync("./dinosaurs.json"));
    let dinoIndex = parseInt(req.params.id);
    let currentDino = allDinos[dinoIndex];
    currentDino.id = dinoIndex;
    
    res.render("dinos/show", { dino: currentDino });
});

// Edit - GET route
router.get("/edit/:id", (req, res) => {
    let dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"));
    let currentDino = dinos[req.params.id];
    currentDino.id = req.params.id;
    res.render("dinos/edit", { dino: currentDino } );
});

// Update - PUT
router.put("/:id", (req, res) => {
    let dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"));
    dinos[req.params.id].name = req.body.name;
    dinos[req.params.id].type = req.body.type;

    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
    res.redirect(`/dinos/${req.params.id}`);
});

// Destroy - DELETE
router.delete("/:id", (req, res) => {
    let dinos = JSON.parse(fs.readFileSync("./dinosaurs.json"));
    
    dinos.splice(req.params.id, 1);
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));

    res.redirect("/dinos");
});

module.exports = router;