//npm install r-script
//npm install underscore

//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");

//create class
var Fpm = {

    //funnel plot derivation
    fpm: function (req, res) {
        //TODO: change path to where your path is
       var out = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
        .data()
        .call(function(err, a) {
            if (err) throw err;
            res.json(a)
        });
        
    }
};
   
module.exports = Fpm;