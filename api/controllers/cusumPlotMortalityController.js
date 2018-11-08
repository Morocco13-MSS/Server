//npm install r-script
//npm install underscore

//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");
var config = require('config');
var cusumMortalityPath = config.get('RPaths.cusumMortality');


//create class
var cusumMortality = {

    //funnel plot derivation
    cusumLine: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "cusumLine";
        var data = R(cusumMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    ucl: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "ucl";
        var data = R(cusumMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },
    lcl: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "lcl";
        var data = R(cusumMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    alerts: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "alerts";
        var data = R(cusumMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    missing: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "missing";
        var data = R(cusumMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        }
};
   
module.exports = cusumMortality;