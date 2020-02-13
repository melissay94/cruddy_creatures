const express = require("express");
const layouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const dinoRoutes = require("./routes/dinos");
const cryptidRoutes = require("./routes/cryptids");


const app = express();
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/dinos", dinoRoutes);
app.use ("/cryptids", cryptidRoutes);
app.use(express.static("static"));

app.listen(3000, () => console.log("I took a trip to the port 3000!"));