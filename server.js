var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

var app = express();

// Middleware-----------------------
// Serve static content for the app
app.use(express.static("public"));

// Parse application body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Points to where express routes are located
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

// Server running
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
  
});