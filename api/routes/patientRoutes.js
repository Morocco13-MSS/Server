'use strict';

module.exports = function(app, dbConnection) {
  var patient = require('../controllers/patientController');

  var dbConnection = dbConnection;
  // Patient Routes
  // TODO: 
  // app.route('/Patients')
  //   .get(patient.getPatientAge);

// The following is a very simple route and api call, without calling controller
  app.route('/Patients')
    .get(function (req, res) {

      var totalPatients = 0;
      var missingCount = 0;
      var gte70 = 0;
      //Number of patients > 70
      var queryString = 'SELECT age AS Age FROM patient'
      dbConnection.query(queryString,function (error, result, fields)
      {
        if (error) throw error;
        for (var i in result)
        {
          totalPatients++;
          if(result[i].Age >= 70)
          {
            gte70++;
          }
          else if(result[i].Age == 0)
          {
            missingCount++;
          }
        }

        var resultObj = {
          total:totalPatients,
          gte70: gte70,
          lt70: totalPatients-gte70-missingCount,
          missing: missingCount
        };
        res.json(resultObj);
        }
      );
    })
};