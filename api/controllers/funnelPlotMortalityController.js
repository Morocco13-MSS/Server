//npm install r-script
//npm install underscore

//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");


//create class
var Fpm = {

    //funnel plot derivation
    fpms: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "scatter";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
        },

    fpmb: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "benchmark";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
        },
    fpmu: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "up";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
        },

    fpml: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "lo";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
        },

    fpmu2: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "up2";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
        },

    fpml2: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "lo2";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
    },

    fpmMiss: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "missing";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
    },

    fpmDot: function (req, res) {

        console.log('Getting inputs...');
        //TODO: only required for unit testing
        req.query.startDate = "2018-01-01";
        req.query.endDate = "2019-01-01";
        req.query.formType = "E";
        req.query.userLevel = 2;
        req.query.userId = 8;

        console.log('These are the inputs: '+req.query.startDate+', '+req.query.endDate+', '+req.query.formType+', '+req.query.userLevel+', '+req.query.userId);

        //TODO: Rememove above lines
        //TODO: change path to where your path is for your R-script
        var plotType = "userIdDot";
        var fpmScatter = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/funnel-plot-mortality.R")
            .data(req.query.startDate,req.query.endDate,req.query.formType,req.query.userLevel,req.query.userId,plotType)
            .call(function(err, a) {
                if (err) throw err;
                res.json(a)
            });
    }
    
};
   
module.exports = Fpm;