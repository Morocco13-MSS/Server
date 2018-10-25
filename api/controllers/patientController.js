//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Patients = {

    //Patients (Curative and age>70)
    agegt70: function (req, res) {

        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 0;
        // req.query.userId = 12;
        // //TODO: Rememove above lines
        // /**********************************************************************************/

        var gtAge70 = 0;
        var totalPatients = 0;
        var missing=0;
        var ltAge70 =0;
        var sqlQuery = "";

        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Patient (age>70): Doctor Level View "+ req.query.userLevel);
            sqlQuery='SELECT patient.id,patient.serieComplete ,patient.age as Age from patient , formulaire, formulaire_item, item, organe where organe.code = "'+ req.query.formType +'" AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND item.intitule = "Résection" AND formulaire_item.valeur_item = 1 and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item) AND formulaire.id_organe = organe.id and patient.id = formulaire.id_patient AND formulaire.id = formulaire_item.id_formulaire AND formulaire_item.id_item = item.id';            
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Patient (age>70): Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery = 'select patient.id,patient.serieComplete ,patient.age as Age from patient , formulaire, formulaire_item, item, organe where organe.code = "'+ req.query.formType +'" AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND item.intitule = "Résection" AND formulaire_item.valeur_item = 1 and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where utilisateur.id_service = "'+ req.query.userId +'" and utilisateur.doctorCode=medecin.doctorCode and formulaire_item.valeur_item=medecin.id and item.intitule="Opérateur1" and item.id=formulaire_item.id_item ) AND formulaire.id_organe = organe.id and patient.id = formulaire.id_patient AND formulaire.id = formulaire_item.id_formulaire AND formulaire_item.id_item = item.id';           
        }
        else
        {
            console.log("Patient (age>70): All Hospitals view "+ req.query.userLevel);
            sqlQuery = 'select patient.id,patient.serieComplete ,patient.age as Age from patient , formulaire, formulaire_item, item, organe where organe.code = "'+ req.query.formType +'" AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND item.intitule = "Résection" AND formulaire_item.valeur_item = 1 AND formulaire.id_organe = organe.id and patient.id = formulaire.id_patient AND formulaire.id = formulaire_item.id_formulaire AND formulaire_item.id_item = item.id';
        }

        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;                
                if(result[i].Age == 999) {
                    missing++;
                }
                else if(result[i].Age >= 70) {
                    gtAge70++;
                }
                else{
                    ltAge70++;
                }
            }
            var resObj = {totalPatients:totalPatients,
                          gtAge70:gtAge70,
                          ltAge70:ltAge70,
                          missing:missing                     
                         };
            res.json(resObj);                 
        }); 
        //****************************************************************************************
    },

    // Patients (Curative and ASA SCORE > 2)
    asascoregt2: function (req, res){

        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 0;
        // req.query.userId = 12;
        // //TODO: Rememove above lines
        // /**********************************************************************************/
       
        var asagt2 = 0;
        var totalPatients = 0;
        var missing=0;
        var asalt2 =0;
        var sqlQuery = "";        

        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Patient (ASA SCORE>2): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as Asa,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score ASA" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';

        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Patient (ASA SCORE>2): Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as Asa,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score ASA" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Patient (ASA SCORE >2): All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as Asa,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score ASA" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
         
        //Note: ASA SCORE: 0:ASA1 1:ASA2 2:ASA3 3:ASA4 999:MISSING
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                console.log(result[i].Asa);
                totalPatients++;                
                if(result[i].Asa == 999) {
                    missing++;
                }
                else if(result[i].Asa >= 1) {
                    asagt2++;
                }
                else{
                    asalt2++;
                }
            }
            var resObj = {totalPatients:totalPatients,
                          asagt2:asagt2,
                          asalt2:asalt2,
                          missing:missing                     
                         };
            res.json(resObj);                 
        });

    },

    // Patients (Curative and OMS > 1)
    omsgt1: function (req, res){
    //    /**********************************************************************************/
    //     //TODO: only required for unit testing
    //     req.query.startDate = "2018-01-01";
    //     req.query.endDate = "2019-01-01";
    //     req.query.formType = "E";
    //     //userLevel  0-doc, 1-unit, 2-all
    //     //userId (Doctor Id or respective unitId)
    //     req.query.userLevel = 0;
    //     req.query.userId = 12;
    //     //TODO: Rememove above lines
    //     /**********************************************************************************/
        var omsgrt1 = 0;
        var totalPatients = 0;
        var missing=0;
        var omslest1 =0;
        var sqlQuery = "";        

        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Patient (OMS SCORE>2): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as Oms,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score OMS" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';

        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Patient (OMS SCORE>2): Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as Oms,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score OMS" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Patient (OMS SCORE>2): All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as Oms,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Score OMS" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
         
        
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                console.log(result[i].Oms);
                totalPatients++;                
                if(result[i].Oms == 999) {
                    missing++;
                }
                else if(result[i].Oms >= 1) {
                    omsgrt1++;
                }
                else{
                    omslest1++;
                }
            }
            var resObj = {totalPatients:totalPatients,
                          omsgrt1:omsgrt1,
                          omslest1:omslest1,
                          missing:missing                     
                         };
            res.json(resObj);                 
        });
    },

    //Patients (Curative and (% Underweight (BMI <18) /% Overweight (BMI> 30)))
    bmi_wtloss: function (req, res){
        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 0;
        // req.query.userId = 12;
        // //TODO: Rememove above lines
        // /**********************************************************************************/
        var totalPatients = 0;
        var bmigt30 = 0;
        var bmilt18 = 0;
        var missingbmi = 0;
        var wlossgt10per = 0;
        var missingwloss = 0;
        var wlosslt10per=0;

        var sqlQuery = "";        

        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Patient (Query the BMI and Weight loss data): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE (item.code = "q13_item" OR item.code = "q15_item") and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Patient (Query the BMI and Weight loss data): Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE (item.code = "q13_item" OR item.code = "q15_item") and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Patient (Query the BMI and Weight loss data): All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE (item.code = "q13_item" OR item.code = "q15_item") and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }        
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;

            for (var i in result) 
            {
                console.log("Code:" + result[i].Code);
                totalPatients++;                
                if(result[i].Code == "q13_item") 
                {
                    console.log("BMI:"+result[i].Value);
                    //BMI data
                    if(result[i].Value == 999){
                        missingbmi++;
                    }
                    else if(result[i].Value < 18){
                        bmilt18++;
                    }
                    else if(result[i].Value > 30){
                        bmigt30++;
                    }                
                }
                else //q15_item
                {   //Data is related to percentage of weight loss
                    console.log("Weight Loss:"+result[i].Value)
                    if(result[i].Value == 999){
                        missingwloss++;
                    }
                    else if(result[i].Value < 10){
                        wlosslt10per++;
                    }
                    else if(result[i].Value > 10){
                        wlossgt10per++;
                    }
                }
            }
            var resObj = {totalPatients:totalPatients,
                bmilt18:bmilt18,
                bmigt30:bmigt30,
                missingbmi:missingbmi,
                wlosslt10per:wlosslt10per,
                wlossgt10per:wlossgt10per,                
                missingwloss:missingwloss                     
              };
            res.json(resObj);                 
        });

    }
};
   
module.exports = Patients;