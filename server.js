var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//importing global view routes
var localRoutes = require('./api/routes/loginRoutes'); 
localRoutes(app); //register the route

var globalRoutes = require('./api/routes/globalRoutes'); 
globalRoutes(app); //register the route

//importing patient routes
var patientRoutes = require('./api/routes/patientRoutes'); 
patientRoutes(app); //register the route

//importing bp routes
var bilanPeroperatoireRoutes = require('./api/routes/bilanPeroperatoireRoutes'); 
bilanPeroperatoireRoutes(app); //register the route

// TODO: importing other routes
// ...

app.listen(port);
console.log('RESTful API server started on: ' + port);
