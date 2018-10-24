var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//importing patient routes
var patientRoutes = require('./api/routes/patientRoutes'); 
patientRoutes(app); //register the route

//importing bilan peroperatoire routes
var bilanPeroperatoireRoutes = require('./api/routes/bilanPeroperatoireRoutes'); 
bilanPeroperatoireRoutes(app); //register the route

// TODO: importing other routes
// ...

app.listen(port);
console.log('RESTful API server started on: ' + port);
