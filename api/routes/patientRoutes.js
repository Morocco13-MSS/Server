'use strict';

module.exports = function(app, dbConnection) {
  var patient = require('../controllers/patientController');

  // Patient Routes
  // TODO: 
  // app.route('/Patients')
  //   .get(patient.getPatientAge);

  // Globle view

  app.route('/global').get(function (req, res){
     //****************************ROW-2, Global View *********************************
     var totalPatients = 0;
     var curativeCount = 0;
     var palliCount = 0;
     var nACount = 0;
     var missCount = 0;
     
     var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item AS itemValue FROM `item`,`formulaire_item` WHERE item.intitule = "Résection"'
     dbConnection.query(queryString,function (error,result, fields) 
     {
         if (error) throw error;
         for (var i in result) 
         {
           totalPatients++;
           if(result[i].itemValue == 0) //Not Applicatble 
           {
             nACount++;
           }
           else if(result[i].itemValue == 1) //A visée curative
           {
             curativeCount++;
           }
           else if(result[i].itemValue == 2) //Palliative
           {
             palliCount++;
           }
           else
           {
             missCount++;
           }            
         }
         //Push the obtained data into Jason objectS
         var globalViewObj  = {
                         totalPatients:totalPatients,
                         curativeCount:curativeCount,
                         palliCount:palliCount,
                         nACount:nACount,
                         missCount,missCount};
         res.json(globalViewObj);
  });
});

// The following is a very simple route and api call, without calling controller
  app.route('/Patients').get(function (req, res) {

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
    });
  }