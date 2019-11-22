var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app
app.use(express.static("public"));

// Parse application body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Import routes giving the server access to them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
  
});