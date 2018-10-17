var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,

  bodyParser = require('body-parser');

// TODO: Muruli, the mysql database should be connected here


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/patientRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('RESTful API server started on: ' + port);