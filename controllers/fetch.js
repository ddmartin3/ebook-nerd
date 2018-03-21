var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");
var db = require("../models");



// A GET route for scraping the good-ereader website
router.get("/good-ereader", function(req, res) {
    // First, we grab the body of the html with request
    request('https://goodereader.com/blog/', function (error, response, html) {
      if (!error && response.statusCode == 200) {
         var $ = cheerio.load(html);
  
          // Now, we grab every h2 within an article tag, and do the following:
          $(".entry-title-link").each(function(i, element) {
            // Save an empty result object
          //  console.log("found usable data");

            var article = $(element);
            var title = article.text();
            var url = article.attr('href');
            var summary = article.parent().parent().next().children('p').text();
            // console.log(title);
            // console.log(url);
            // console.log(summary);
  
            var result = {};
      
            // Add the text and href of every link, and save them as properties of the result object
            result.headline = title;
            result.url = url;
            result.summary = summary;

          //  console.log(result);
      
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, send it to the client
            //    return res.json(err);
                console.log(err);
              });
         });

      };
      // If we were able to successfully scrape and save an Article, send a message to the client
   //   res.send("Scrape Complete");
    });
});

// A GET route for scraping the-ebook-reader website
router.get("/the-ebook-reader", function(req, res) {
  // First, we grab the body of the html with request
  request('http://blog.the-ebook-reader.com/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
       var $ = cheerio.load(html);

        // Now, we grab every h2 within an article tag, and do the following:
        $(".title").each(function(i, element) {
          // Save an empty result object
          console.log("  ");

          var article = $(element);
          var title = article.children('a').text();
          var url = article.children('a').attr('href');
          var summary = article.next().next().children('p').text();
          
          // console.log(title);
          // console.log(url);
          // console.log(summary);

          var result = {};
    
          // Add the text and href of every link, and save them as properties of the result object
          result.headline = title;
          result.url = url;
          result.summary = summary;

          //console.log(result);
    
          //Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
          //    return res.json(err);
              console.log(err);
            });
       });

    };
    // If we were able to successfully scrape and save an Article, send a message to the client
 //   res.send("Scrape Complete");
  });
});

//----------Diplay Routes---------------------

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

// Route for getting all saved Articles from the db 
router.get("/saved", function(req, res) {
  console.log("triggered saved route");
  // Grab every document in the Articles collection
  db.Article.find({ 'saved': true })
    .then(dbArticle => {
      // If we were able to successfully find Articles, send them back to the client
      var handlebarsObject = {
          article: dbArticle
      };
      console.log(handlebarsObject);
      res.render("saved", handlebarsObject);
  });
});        


//-----------update routes----------------
//Route for saving articles

router.put("/article/:id", function(req, res) {
  db.Article.findById(req.params.id, function (err, saved) {
    if (err) return handleError(err);

    saved.set({saved: true});
    saved.save(function (err, updatedSaved) {
      if (err) return handleError(err);
      console.log(updatedSaved);
      res.send(updatedSaved);
    });
  });
});   



module.exports = router;