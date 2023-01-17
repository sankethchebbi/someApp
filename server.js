const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const message = require('./models/message');

const app = express();
//load keys file
const keys = require('./config/keys');

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongoDB 
mongoose.connect(keys.MongoDB, {useNewUrlParser: true}).then(() => {
    console.log("server connected to MongoDB");
}).catch(err => console.log(err));

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

app.post("/contactUs", (req, res) => {
  console.log(req.body);
  const newMessage = {
    fullname: req.body.fullname,
    email: req.body.email,
    message: req.body.message,
    date: new Date()
  }
  new message(newMessage).save().then(message => {
    if (err){
     console.log(err);
    }
    else {
      res.status(200).render('newMessage', {
        title: 'Message Sent',
    });
  }
  });
});

app.listen(port, () => console.log("listening on 3000"));