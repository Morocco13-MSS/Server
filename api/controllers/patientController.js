//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Patients = {

    //Patients (Curative and age>70)
    agegt70: function (req, res) {
        // console.log(req)
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
                        
        db.query(queryString,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
            CurPatients++; 
            }
            var resObj = {patientgt70:CurPatients};
            res.json(resObj); //TODO: Need to modify the scripts to send back total curative patients                           
        }); 
        //****************************************************************************************
    },

    // Patients (Curative and ASA SCORE > 2)
    asascoregt2: function (req, res){
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
    },

    // Patients (Curative and OMS > 1)
    omsgt1: function (req, res){
        // var patientgtasa2 = 0;
        // res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients 
    
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
    },

    //Patients (Curative and (% Underweight (BMI <18) /% Overweight (BMI> 30)))
    bmi: function (req, res){
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
        //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
        // });
    }
};
   
module.exports = Patients;