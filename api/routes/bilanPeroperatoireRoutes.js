'use strict';

module.exports = function(app) {

    // Use Global View controller to pull data from the model (MySQL DB), 
    // convert it to JSON and return it to the route.

    var bpData = require('../controllers/bilanPeroperatoireController');
    
    // API for  tumeur
    app.route('/preop/tumeur')
    .get(bpData.mdt);

    // API for  MDT
    app.route('/preop/mdt')
    .get(bpData.mdt);

    // API for  TDM Thoracique
    app.route('/preop/tdmThoracique')
    .get(bpData.tdmThoracique);
    
    // API for TDM Abdominale
    app.route('/preop/tdmAbdominale')
    .get(bpData.tdmAbdominale);

    //neoAdjuvant treatment
    app.route('/preop/neoAdjuvant')
    .get(bpData.neoAdjuvant);

    //Days between end of neo-adjavant treatment and surgery treatment
    app.route('/preop/daysBeforeSurgery')
    .get(bpData.daysBeforeSurgery);
    

};