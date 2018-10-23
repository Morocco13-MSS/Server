'use strict';

module.exports = function(app) {

    // Use patient controller to pull data from the model (MySQL DB), 
    // convert it to JSON, 
    // and return it to the route.
    var bilanPeroperatoire = require('../controllers/bilanPeroperatoireController');

    // API for TDM View ROW 2
    app.route('/preop/tdmThorax')
    .get(bilanPeroperatoire.tdmThorax);

  

};