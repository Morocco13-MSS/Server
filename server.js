var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,

  bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');


// Connect to the database
console.log('Connecting to the database.....');
var connection = mysql.createConnection({
 database: 'mssDB',  // TODO: change your database name
 host: "localhost",
 user: "root",
 password: "abcd1234!"
});

connection.connect(function(err) {
 if (err) throw err;
 console.log("Connected to the database!!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var routes = require('./api/routes/patientRoutes'); //importing route
routes(app, connection); //register the route


app.listen(port);


console.log('RESTful API server started on: ' + port);