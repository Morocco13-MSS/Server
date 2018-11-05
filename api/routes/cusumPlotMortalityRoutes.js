'use strict';

module.exports = function(app) {

    var cusumData = require('../controllers/cusumPlotMortalityController');

    // API for cusum mortality trend line
    app.route('/cusum/cusumLine')
    .get(cusumData.cusumLine);

    // API for cusum mortality upper control limit
    app.route('/cusum/ucl')
    .get(cusumData.ucl);

    // API for cusum mortality lower control limit
    app.route('/cusum/lcl')
    .get(cusumData.lcl);

    // API for funnel plot mortality lo aka large confidence interval lower bound
    app.route('/cusum/alerts')
    .get(cusumData.alerts);

    // API for funnel plot mortality up2 aka small confidence interval upper bound
    app.route('/cusum/missing')
    .get(cusumData.missing);

    
};