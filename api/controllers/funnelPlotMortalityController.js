//npm install r-script
//npm install underscore

//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");


//create class
var Fpm = {

    //funnel plot derivation
    fpm: function (req, res) {
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 3;
        req.query.userId = 2;
//TODO: Rememove above lines
        //TODO: change path to where your path is
       var out = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
        .data(req.query.startDate,req.query.endDate)
        .call(function(err, a) {
            if (err) throw err;
            res.json(a)
        });
        
    }
};
   
module.exports = Fpm;