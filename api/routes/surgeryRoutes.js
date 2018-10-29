'use strict';

module.exports = function(app) {

    // Use Surgery View controller to pull data from the model (MySQL DB), 
    // convert it to JSON and return it to the route.

    var surgeryData = require('../controllers/surgeryController');
    
    app.route('/surgery/firstlook')
    .get(surgeryData.firsLook);
    
    app.route('/surgery/resecAsso')
    .get(surgeryData.resecAsso);

    app.route('/surgery/perforation')
    .get(surgeryData.perforation);

    app.route('/surgery/contamination')
    .get(surgeryData.contamination);

    app.route('/surgery/intraTrans')
    .get(surgeryData.intraTrans);

    app.route('/surgery/averageBloodLoss')
    .get(surgeryData.averageBloodLoss);

    app.route('/surgery/lumphNodeExamCount')
    .get(surgeryData.lumphNodeExamCount);

    

};