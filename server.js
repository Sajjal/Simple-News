const express = require("express");
const app = express();
const path = require("path");

//Set View Engine and Static Directory Path
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
app.set("view engine", "ejs");

//Import routes
const titleRoute = require("./routes/titleRouter");
const newsRoute = require("./routes/newsRouter");

//MiddleWares
app.use(express.urlencoded({ extended: false }));
app.use("/", titleRoute);
app.use("/news", newsRoute);

let port = process.env.PORT || 3000;

app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  return console.log(`Listening on localhost:${port}`);
});
