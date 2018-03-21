var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("../models");

// Route for getting all Articles from the db
router.get("/", function(req, res) {
    console.log("triggered index route");
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(dbArticle => {
        // If we were able to successfully find Articles, send them back to the client
        var handlebarsObject = {
            article: dbArticle
        };
        console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});        

//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
// });

module.exports = router;