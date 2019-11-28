// Import MySQL connection
var connection = require("../config/connection");

// Helper function for SQL syntax
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax (readable query)
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string into arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions
var orm = {
  selectAll: function(table, cb) {
    var queryString = `SELECT * FROM ${table}`;
    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  
  // An example of objColVals would be {name: Cheese Burger, order: true}
  insertOne: function(table, cols, vals, cb) {
    var queryString = `INSERT INTO ${table}`;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";    

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  updateOne: function(table, objColVals, id, cb) {
    var queryString = `UPDATE ${table}`;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE id = ";
    queryString += id;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  deleteOne: function(table, id, cb) {
    var queryString = `DELETE FROM ${table}`;
    queryString += " WHERE id = ";
    queryString += id;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }  
};

module.exports = orm;