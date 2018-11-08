//npm install r-script
//npm install underscore

//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");
var config = require('config');
var fpmMortalityPath = config.get('RPaths.fpmMortality');

//create class
var Fpm = {

    //funnel plot derivation
    fpms: function (req, res) {

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
        var plotType = "scatter";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    fpmb: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";c
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // req.query.userLevel = 2;
        // req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "benchmark";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },
    fpmu: function (req, res) {

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
        var plotType = "up";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    fpml: function (req, res) {

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
        var plotType = "lo";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    fpmu2: function (req, res) {

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
        var plotType = "up2";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
        },

    fpml2: function (req, res) {

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
        var plotType = "lo2";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
    },

    fpmMiss: function (req, res) {

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
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
    },

    fpmDot: function (req, res) {

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
        var plotType = "userIdDot";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
    },

    fpmUnitsDots: function (req, res) {

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
        var plotType = "allUnitsDots";
        var data = R(fpmMortalityPath)
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .callSync();
                console.log(data);
            res.json(data);
    }
    
};
   
module.exports = Fpm;