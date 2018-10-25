//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");

//create class
var bilanPeroperatoire = {

    //Global View ROW 2
    tdmThorax: function (req, res) {
        /********************************************************* */  
        //TODO: Remove the below json object and get it as input

        
        // var reqObj = {
        //     startDate: req.query.startDate,
        //     endDate: req.query.endDate,
        //     formType: req.query.formType,
        //     userLevel: req.query.userLevel,
        //     userId :req.query.userId,
        // };
        
        var startDate = "2018-01-01";
        var endDate = "2019-01-01";
        var formType = "E";
        var userLevel = "0";
        var userId = "8";

        /********************************************************* */
        var out=R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/colonPreopTdmThorax.R")
        .data("2018-01-01")
        .call(function(err, a) {
            if (err) throw err;
            res.json(a[0]);
        });


        }
};

   
module.exports = bilanPeroperatoire;