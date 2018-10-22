'use strict';

module.exports = function(app, dbConnection) {
  var patient = require('../controllers/patientController');
  var dbConnection = dbConnection;


//**************** API for ROW-3,Patients (Curative and age>70)********************
  app.route('/patients/curative/agegt70')
  .get(function (req, res)
  { 
    var CurPatients = 0;
    var queryString = 'SELECT * FROM `formulaire_item`,`patient`,`item`,`formulaire` WHERE patient.age > 70 && item.intitule = "Résection" && formulaire_item.valeur_item = "1" && formulaire.id_patient=patient.id && formulaire.id = formulaire_item.id_formulaire && formulaire_item.id_item = item.id '
    dbConnection.query(queryString,function (error,result, fields) 
    {
        if (error) throw error;
        for (var i in result) 
        {
          CurPatients++;        
        }
        var resObj = {patientgt70:CurPatients};
        res.json(resObj); //TODO: Need to modify the scripts to send back total curative patients                           
    });    
})
//****************************************************************************************


//**************** API for ROW-4,Patients (Curative and ASA SCORE > 2)********************
app.route('/patients/curative/asascoregt2')
.get(function (req, res)
{ 
    var patientgtasa2 = 0;
    var resObj = {patientgtasa2:patientgtasa2};
    // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
    // dbConnection.query(queryString,function (error,result, fields) 
    // {
    //     if (error) throw error;
    //     for (var i in result) 
    //     {
    //       patientgtasa2++;        
    //     }
        
    //     var resObj = {patientgtasa2:patientgtasa2};
    //     res.json(resObj);  //TODO: Need to modify the scripts to send back total curative patients                             
    // });
})
//***************************************************************************************

//**************** API for ROW-5,Patients (Curative and OMS > 1)********************
app.route('/patients/curative/omsgt1')
.get(function (req, res)
{ 
    var patientgtasa2 = 0;
    var resObj = {patientgtasa2:patientgtasa2};
    res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients 
    
    // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
    // dbConnection.query(queryString,function (error,result, fields) 
    // {
    //     if (error) throw error;
    //     for (var i in result) 
    //     {
    //       patientgtasa2++;        
    //     }
    //     var resObj = {patientgtasa2:patientgtasa2};
    //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
    // });
})
//***************************************************************************************

//**************** API for ROW-6,Patients (Curative and (% Underweight (BMI <18) /% Overweight (BMI> 30)))********************
app.route('/patients/curative/bmi')
.get(function (req, res)
{ 
    var patientgtasa2 = 0;
    // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
    // dbConnection.query(queryString,function (error,result, fields) 
    // {
    //     if (error) throw error;
    //     for (var i in result) 
    //     {
    //       patientgtasa2++;        
    //     }
    //     var resObj = {patientgtasa2:patientgtasa2};
    //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
    // });
})
//***************************************************************************************

//**************** API for ROW-7,Patients (Curative and OMS > 1)********************
app.route('/patients/curative/omsgt1')
.get(function (req, res)
{ 
    var patientgtasa2 = 0;
    // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
    // dbConnection.query(queryString,function (error,result, fields) 
    // {
    //     if (error) throw error;
    //     for (var i in result) 
    //     {
    //       patientgtasa2++;        
    //     }
    //     var resObj = {patientgtasa2:patientgtasa2};
    //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
    // });
})
//***************************************************************************************

};
  



















      

