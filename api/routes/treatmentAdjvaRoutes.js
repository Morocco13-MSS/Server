'use strict';

module.exports = function(app) {

    // Use Surgery View controller to pull data from the model (MySQL DB), 
    // convert it to JSON and return it to the route.

    var treatmentAdjav = require('../controllers/treatmentAdjavController');
    
    app.route('/treatmentAdjav/chemo_rct')
    .get(treatmentAdjav.chemo_rct);

    app.route('/treatmentAdjav/timebwsurgeryAndAdjuv')
    .get(treatmentAdjav.timebwsurgeryAndAdjuv);

    

};