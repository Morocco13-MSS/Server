'use strict';

module.exports = function(app) {

    // Use Global View controller to pull data from the model (MySQL DB), 
    // convert it to JSON and return it to the route.

    var patients = require('../controllers/globalViewController');

    // API for Global View ROW 2
    app.route('/patients/globalView')
    .get(patients.global);
    
};