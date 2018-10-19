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
  .get(function (req, res)
  { 
     //This will obtain data for
     // - Global View
     // - Patient View
        // - 


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

        }    
      );
    //********************************************************************************

    // //****************************ROW-3,Patients (Curative and age>70) ****************
    // var CurPatients = 0;
    // var queryString = 'SELECT * FROM `formulaire_item`,`patient`,`item`,`formulaire` WHERE patient.age > 70 && item.intitule = "Résection" && formulaire_item.valeur_item = "1" && formulaire.id_patient=patient.id && formulaire.id = formulaire_item.id_formulaire && formulaire_item.id_item = item.id '
    // dbConnection.query(queryString,function (error,result, fields) 
    // {
    //     if (error) throw error;
    //     for (var i in result) 
    //     {
    //       CurPatients++;        
    //     }
    //     var patientgt70 = {CurPatients:CurPatients};
                           
    // });
    // //****************************End of Patients Age> 70******************************
    // var resultObj={ globalViewObj, patientgt70};
    // res.json(resultObj);     

// //****************************ROW-4,Patients (Curative and ASA>2) ****************
// CurPatients = 0;

// //Number of patients > 70
// var queryString = 'SELECT * FROM `formulaire_item`,`patient`,`item`,`formulaire` WHERE item.intitule = "Résection" && formulaire_item.valeur_item > "2" && formulaire.id_patient=patient.id && formulaire.id = formulaire_item.id_formulaire && formulaire_item.id_item = item.id '
// connection.query(queryString,function (error,result, fields) 
// {
//     if (error) throw error;
//     for (var i in result) 
//     {
//       CurPatients++;        
//     }
//     var resultObj = {CurPatients:CurPatients};
//     console.log(resultObj)                 
// });
// //****************************End of Patients Age> 70******************************


// //****************************End of Patients Age> 70******************************
// var queryString = 'SELECT item.intitule as Name ,formulaire_item.valeur_item as value FROM `item`,`formulaire_item` WHERE item.intitule = "Score ASA" and (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3")' 

// //*********************************************************************************
// connection.query(queryString,function (error,result, fields) 
// {
//     if (error) throw error;
//     for (var i in result)
//     {
//       console.log(result[i].value)
//     }
// });
// //****************************End of Patients Age> 70******************************


















      
    })
};


//res.json(resultObj);