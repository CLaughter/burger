var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger");


// Create all our routes and set up logic within those routes where required
router.get("/", function(req,res) {
  burger.selectAll(function(data) {
  var hbsObject = {
    burgers: data
  };
  console.log(hbsObject);
  res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    ["burger_name", "price", "devoured", "cheese"],
    [req.body.burger_name, req.body.price, req.body.devoured, req.body.cheese],
    function(result) {
      // Send back the ID of new burger
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({ order: req.body.order }, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });

  burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
    if (result.changedRows === 0) {

      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.deleteOne(condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;