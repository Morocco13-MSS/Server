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
        
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 3;
        req.query.userId = 2;

        /********************************************************* */
        var out=R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/colonPreopTdmThorax.R")
            .data(req.query.startDate,req.query.endDate)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a[0]);
        });


        }
};

   
module.exports = bilanPeroperatoire;