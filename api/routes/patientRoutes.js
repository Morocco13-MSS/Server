'use strict';
module.exports = function(app, dbConnection) {
  var patient = require('../controllers/patientController');
  var dbConnection = dbConnection;

//**************** API for Global View ROW 2********************
app.route('/patients/global')
.get(function (req, res)
{
    /********************************************************* */  
    //TODO: Remove the below json object and get it as input
    var startDate = "2018-01-01";
    var endDate = "2019-01-01";
    
    var reqObj = {startDate:startDate,
                  endDate:endDate,
                  formType:'E',
                  UnitType:1};  
    /********************************************************* */
    var totalPatients = 0;
    var curativeCount = 0;
    var palliCount = 0;
    var nACount = 0;
    var missCount = 0;
    
    var queryString = 'SELECT formulaire.id, formulaire.id_organe, organe.id, organe.code, item.intitule , formulaire_item.id_formulaire , formulaire_item.valeur_item as itemValue FROM `formulaire`,`organe`,`item`,`formulaire_item` WHERE (formulaire.id_organe = organe.id AND organe.code = "E" AND formulaire.id = formulaire_item.id_formulaire) AND item.intitule = "Résection"';
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
        
        var resObj  = {
                        totalPatients:totalPatients,
                        curativeCount:curativeCount,
                        palliCount:palliCount,
                        nACount:nACount,
                        missCount,missCount};
        res.json(resObj);             
     
        }    
      );
   
})
//****************************************************************************************

  


//**************** API for ROW-3,Patients (Curative and age>70)********************
  app.route('/patients/curative/agegt70')
  .get(function (req, res)
  { 
    /********************************************************* */  
    //TODO: Remove the below json object and get it as input
    var startDate = "2018-01-01";
    var endDate = "2019-01-01";
    var reqObj = {startDate:startDate,
                  endDate:endDate};  
    /********************************************************* */  
    console.log("startDate:", reqObj.startDate);
    console.log("endDate:",reqObj.endDate);
    var CurPatients = 0;
    var queryString = 'SELECT * FROM `formulaire_item`,`patient`,`item`,`formulaire` WHERE (formulaire.date_creation BETWEEN "'+ reqObj.startDate +'" AND "'+ reqObj.endDate +'")  AND patient.age > 70 && item.intitule = "Résection" && formulaire_item.valeur_item = "1" && formulaire.id_patient=patient.id && formulaire.id = formulaire_item.id_formulaire && formulaire_item.id_item = item.id';
                     
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
    // var patientgtasa2 = 0;
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
  



















      

