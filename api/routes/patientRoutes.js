'use strict';

module.exports = function(app) {
  var patient = require('../controllers/patientController');

  // Patient Routes
  app.route('/Patients')
    .get(patient.getPatientAge);

// The following is a very simple route and api call, without calling controller
//   app.route('/tasks')
//     .get(function (req, res) {
//         res.send('i am inside routes');
//     })
};
