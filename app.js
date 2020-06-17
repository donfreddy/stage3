const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const routes = require("./routes/routes.js")(app, fs);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});