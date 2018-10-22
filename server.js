// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 8080,

//   bodyParser = require('body-parser');
// var cors = require('cors');
// var mysql = require('mysql');


// // Connect to the database
// console.log('Connecting to the database.....');
// var connection = mysql.createConnection({
//  database: 'mssDB',  // TODO: change your database name
//  host: "localhost",
//  user: "root",
//  password: "abcd1234!"
// });

// connection.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected to the database!!");
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());


// var routes = require('./api/routes/patientRoutes'); //importing route
// routes(app, connection); //register the route


// app.listen(port);


// console.log('RESTful API server started on: ' + port);

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('http://localhost:3000/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id } 
    app.render(req, res, actualPage, queryParams);
    // axios.get('http://localhost:8080/patients') // REST get api call
    // .then(response => {
    //     console.log(response.data.gte70); 
    //     app.render(req, res, actualPage, queryParams);
    // });
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:8080')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
