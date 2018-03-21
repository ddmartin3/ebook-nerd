var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/ebook-news");
}

mongoose.Promise = Promise;

// Import routes and give the server access to them.
var routes = require("./controllers/fetch.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
