'use strict';

module.exports = function(app) {

    // Use patient controller to pull data from the model (MySQL DB), 
    // convert it to JSON, 
    // and return it to the route.
    var patients = require('../controllers/patientController');

    // API for ROW-3,Patients (Curative and age>70)
    app.route('/patients/curative/agegt70')
    .get(patients.agegt70);

    // API for ROW-4,Patients (Curative and ASA SCORE > 2)
    app.route('/patients/curative/asascoregt2')
    .get(patients.asascoregt2);

    // API for ROW-5,Patients (Curative and OMS > 1)
    app.route('/patients/curative/omsgt1')
    .get(patients.omsgt1);

    // API for ROW-6,Patients (Curative and (% Underweight (BMI <18) /% Overweight (BMI> 30)))
    app.route('/patients/curative/bmi')
    .get(patients.bmi);

};
  



















      

