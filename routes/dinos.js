const express = require("express");

// Add router
const router = express.Router();

// Index - GET route
router.get("/", (req, res) => {
    res.render("dinos/index", { dinos: [] });
});

// New - GET route
router.get("/new", (req, res) => {
    res.render("dinos/new");
});

// Create - POST route
router.post("/", (req, res) => {

});

// Show - GET route
router.get("/:id", (req, res) => {
    res.render("dinos/show", { dino: { id: req.params.id } });
});

// Edit - GET route
router.get("/edit/:id", (req, res) => {
    res.render("dinos/edit", { dino: { id: req.params.id } });
});

// Update - Put

module.exports = router;