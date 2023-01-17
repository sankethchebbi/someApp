const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const defaultContext = {
    appName: "Gotcha!"
};
const hbs = exphbs.create({
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req, res) => {
  res.status(200).render("home", defaultContext);
});

app.get("/about", (req, res) => {
  res.status(200).render("about", defaultContext);
}); 

app.get("/contact", (req, res) => {
    res.status(200).render("contact", defaultContext);
});

app.listen(port, () => console.log("listening on 3000"));