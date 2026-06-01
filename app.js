const express = require("express");
const { listeParcsRDC } = require("./public/parcsModule.js");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("accueil", { pageTitle: "accueil" });
});

app.get("/apropos", (req, res) => {
  res.render("apropos", { pageTitle: "apropos" });
});

app.get("/parcs", (req, res) => {
  res.render("parcs", { pageTitle: "parcs"});
});


app.listen(port, () => console.log(`http://localhost:${port}`));
