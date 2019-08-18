//dependencies
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

//initialize Express app
const express = require("express");
const app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// connecting to a public folder
app.use(express.static(process.cwd() + "/public"));

//Require set up handlebars
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//connecting to MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/newsscraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongoose!");
});

const routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on PORT " + port);
});