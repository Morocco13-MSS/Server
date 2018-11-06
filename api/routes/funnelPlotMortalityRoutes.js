'use strict';

module.exports = function(app) {

    var fpmData = require('../controllers/funnelPlotMortalityController');

    // API for funnel plot mortality scatter
    app.route('/fpm/scatter')
    .get(fpmData.fpms);

    // API for funnel plot mortality benchmark aka overall proportion of mortality rate
    app.route('/fpm/benchmark')
    .get(fpmData.fpmb);

    // API for funnel plot mortality up aka large confidence interval upper bound
    app.route('/fpm/up')
    .get(fpmData.fpmu);

    // API for funnel plot mortality lo aka large confidence interval lower bound
    app.route('/fpm/lo')
    .get(fpmData.fpml);

    // API for funnel plot mortality up2 aka small confidence interval upper bound
    app.route('/fpm/up2')
    .get(fpmData.fpmu2);

    // API for funnel plot mortality up2 aka small confidence interval lower bound
    app.route('/fpm/lo2')
    .get(fpmData.fpml2);

    // API for funnel plot mortality missing number (patients without Clavien scores at 90 days)
    app.route('/fpm/missing')
    .get(fpmData.fpmMiss);

    // API for dot that is the user's on the scatter plot
    app.route('/fpm/userDot')
    .get(fpmData.fpmDot);

    // API for dot that is the user's on the scatter plot
    app.route('/fpm/allUnitsDots')
    .get(fpmData.fpmUnitsDots);
    
};