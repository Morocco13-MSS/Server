var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,

  bodyParser = require('body-parser');
var cors = require('cors');

// TODO: Muruli, the mysql database should be connected here


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var routes = require('./api/routes/patientRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('RESTful API server started on: ' + port);