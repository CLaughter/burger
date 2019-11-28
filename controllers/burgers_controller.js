var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger");


// Create all our routes and set up logic within those routes where required
router.get("/", function(req,res) {
  burger.selectAll(function(data) {
    console.log(data);
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
  console.log("burger added");

  burger.insertOne(
    ["burger_name", "price", "devoured", "cheese"],
    [req.body.burger_name, req.body.price, 0, 0],
    function(result) {
      // Send back the ID of new burger
      res.json({ id: result.insertId });
      console.log("Inserted");
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  var id = req.params.id;
  var devoured = req.body.devoured;

  // burger.updateOne({ order: req.body.order }, condition, function(result) {
  //   if (result.changedRows === 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });

  burger.updateOne({ devoured: devoured }, id, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      console.log("burger updated");
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var id = req.params.id;

  burger.deleteOne(id, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    console.log("burger deleted")
  });
});

module.exports = router;