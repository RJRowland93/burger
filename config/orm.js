// dependencies
var connection = require("./connection.js");

function printQuestionMarks(num) {
		var arr = [];

		for (var i = 0; i < num; i++) {
			arr.push("?");
		}

		return arr.toString();
	}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (Object.hasOwnProperty.call(ob, key)) {
			arr.push(key + "=" + ob[key]);
		};
	}
	return arr.toString();
} 

var orm = {

	selectAll: function(table, cb) {
		var queryString = "SELECT * FROM " + table + ";";
		connection.query(queryString, function(err, res) {
			if (err) throw err;
			cb(res);
		});
	},
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table;
		queryString += " (" + col.toString() + ") ";
		queryString += "VALUES (" + printQuestionMarks(vals.length) + ") ";

		console.log(queryString);

		connection.query(queryString, vals, function(err, res) {
			if (err) throw err;
			cb(res);	
		})
	},
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table + " SET ";
		queryString += objToSql(objColVals) + " WHERE " + condition;

		console.log(queryString);
		connection.query(queryString, function(err, res) {
			if (err) throw err;
			cb(res);
		});
	}
};

module.exports = orm;