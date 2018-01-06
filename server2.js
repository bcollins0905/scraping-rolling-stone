// var express = require("express");
// var bodyParser = require("body-parser");
// var logger = require("morgan");
// var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var request = require("request");
// var axios = require("axios");

// var db = require("./models");
// var PORT = 3000;


// var app = express();

// app.use(logger("dev"));

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static("public"));

// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/rollingStoneScrape", {
//   useMongoClient: true
// });

// // app.get("/scrape", function(req, res) {
// //   // First, we grab the body of the html with request
// //   axios.get("https://www.indeed.com/jobs?q=startup&l=San+Francisco%2C+CA").then(function(response) {
// //     // Then, we load that into cheerio and save it to $ for a shorthand selector
// //     console.log(response)
// //     var $ = cheerio.load(response.data);


// // First, tell the console what server.js is doing
// console.log("\n***********************************\n" +
//             "Grabbing every thread name and link\n" +
//             "from Rolling Stone Magazine:" +
//             "\n***********************************\n");
// // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
// request("https://www.rollingstone.com/", function(error, response, html) {
//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);
//   // An empty array to save the data that we'll scrape
//   var results = [];
//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
  
// //"p.vertical-feed-article-description"

//   $(".vertical-feed-article-link-container").each(function(i, element) {
//     //console.log(element)
//     // Save the text of the element in a "title" variable
//     var title = $(element).text().trim();
//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).children().attr("href");
//     // Save these results in an object that we'll push into the results array we defined earlier
//     var summary = $(element).children().attr("p.vertical-feed-article-description");

//     results.push({
//       title: title,
//       link: link,
//       summary: summary
//     });
//   });
//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });



///////This kinda Works/////////

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("./models");
// var PORT = 3000;
// Initialize Express
var app = express();
// Configure middleware
// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
// app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/rollingStoneScrape", {
//   useMongoClient: true
// });
// Routes
// A GET route for scraping the echojs website
// app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  // axios.get("https://www.rollingstone.com/").then(function(response) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   // console.log(response)
  //   var $ = cheerio.load(response.data);

  //   // // Now, we grab every h2 within an article tag, and do the following:
  //   $("article div").each(function(i, element) {
  //   //console.log(element)   
  //   // Save an empty result object
  //     var result = {};
  //   //   // Add the text and href of every link, and save them as properties of the result object
  //     result.title = $(this)
  //       .children("div")
  //       .text()
  //       .trim();

  //     result.link = $(this)
  //       .parent("a")
  //       .attr("href");
  
      
  //     result.summary = $(this)
  //       .children("p")
      // Create a new Article using the `result` object built from scraping
      // db.Article
      //   .create(result)
      //   .then(function(dbArticle) {
      //     // If we were able to successfully scrape and save an Article, send a message to the client
      //     res.send("Scrape Complete");
      //   })
      //   .catch(function(err) {
      //     // If an error occurred, send it to the client
      //     res.json(err);
      //   });
  //   console.log(result) 

  //   });

  // });
// })
// Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article
//     .find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//   db.Article
//     .findOne({ _id: req.params.id })
//     // ..and populate all of the notes associated with it
//     .populate("note")
//     .then(function(dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note
//     .create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
// // Start the server
// app.listen(PORT, function() {
//   console.log("App running on port " + PORT + "!");
// });









