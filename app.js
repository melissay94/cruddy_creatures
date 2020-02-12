const express = require("express");
const layouts = require("express-ejs-layouts");
const dinoRoutes = require("./routes/dinos");

const app = express();
app.set("view engine", "ejs");
app.use(layouts);

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/dinos", dinoRoutes);

app.listen(3000, () => console.log("I took a trip to the port 3000!"));