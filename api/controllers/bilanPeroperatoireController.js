//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");

//create class
var bilanPeroperatoire = {

    //Global View ROW 2
    tdmThorax: function (req, res) {
        /********************************************************* */  
        //TODO: Remove the below json object and get it as input
        var startDate = "2018-01-01";
        var endDate = "2019-01-01";
        
        var reqObj = {
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            formType: req.query.formType,
            userLevel: req.query.userLevel,
            userId :req.query.userId,
        }; 
        /********************************************************* */
       var out = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/colonPreopTdmThorax.R")
        .data()
        .call(function(err, a) {
            if (err) throw err;
            res.json(a);
        });
        
        

    

        

        var totalPatients = 0;
        var adherent = 0;
        var nonAdherent = 0;
        var missing = 0;


        }
};

   
module.exports = bilanPeroperatoire;