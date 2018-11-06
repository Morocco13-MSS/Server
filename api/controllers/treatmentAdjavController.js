//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var TreatmentAdjav = {
    
    chemo_rct: function (req, res)
    {
        //% Traitement adjuvant  = 1 OR 2 with patients Clavien J90 score not equal or greater than 5 and with Adjavant treatment
        //of the type Chemothrepy or Radio-chemothrepy
        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 1;
        // req.query.userId = 3;
        // //TODO: Rememove above lines
        // /**********************************************************************************/
        var totalPatients = 0;
        var chemoOrRct = 0;
        var others = 0;
        var missing = 0;
   
        var sqlQuery = "";        
    
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Surgery (Query First loop opinion): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Surgery (Query First loop opinion):: Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Surgery (Query First loop opinion):: All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }        
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
    
            for (var i in result) 
            {                
                totalPatients++;
                console.log("Data:" + result[i].Value);
                switch(result[i].Value)
                {
                    case '0':
                    case '3':
                    case '4':
                            others++;
                            break;
                    case '1': 
                    case '2':
                            chemoOrRct++;
                            break;
                    default:missing++
                            break;
                };  
            }
            
            var resObj = {                
                totalPatients:totalPatients,
                chemoOrRct:chemoOrRct,
                others:others,
                missing:missing,
                note:"Classification of the curative patients with Traitement adjuvant  of type 1 OR 2 and having the Clavien J90 score not equal to 5"
                };
            res.json(resObj);                 
        });
    }   
    ,
    timebwsurgeryAndAdjuv: function (req, res)
    {
        //% Traitement adjuvant  = 1 OR 2 with patients Clavien J90 score not equal or greater than 5 and with Adjavant treatment
        //of the type Chemothrepy or Radio-chemothrepy and time betweeen Surgery and adjuvant treatment
        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 1;
        // req.query.userId = 3;
        // //TODO: Rememove above lines
        // /**********************************************************************************/
        var totalPatients = 0;
        var lessth6weeks = 0;
        var morethan6weeks = 0;
        var missing = 0;
   
        var sqlQuery = "";        
    
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Surgery (Query First loop opinion): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q205_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q203_item" and (formulaire_item.valeur_item = 1 or formulaire_item.valeur_item = 2) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item < 5 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Surgery (Query First loop opinion):: Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q205_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q203_item" and (formulaire_item.valeur_item = 1 or formulaire_item.valeur_item = 2) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire )  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item < 5 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Surgery (Query First loop opinion):: All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q205_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q203_item" and (formulaire_item.valeur_item = 1 or formulaire_item.valeur_item = 2) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item < 5 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }        
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
    
            for (var i in result) 
            {                
                totalPatients++;
                console.log("Data:" + result[i].Value);
                //missing count
                if(result[i].Value == 999)
                {
                    missing++;
                }
                else if(result[i].Value < 42) // less than 6 weeks
                {
                    lessth6weeks++;
                }
                else if(result[i].Value >= 42) // greater than 8 weeks
                {
                    morethan6weeks++;
                }                
            }
            
            var resObj = {                
                totalPatients:totalPatients,
                lessth6weeks:lessth6weeks,
                morethan6weeks:morethan6weeks,
                missing:missing,
                note:"Classification of the curative patients based on the time taken between surgery and adjuvant treatment with adjuvant  treatment of type 1/2 and having the Clavien J90 score not equal to 5"
                };
            res.json(resObj);                 
        });
    }    
    ,
    //Curative + clavein !=5 + Curtail + Number of bottles of blood give > 0 + adjuvantTreatment type 1 or 2
    chemo_rct_withBloodCount: function (req, res)
    {
        //% Traitement adjuvant  = 1 OR 2 with patients Clavien J90 score not equal or greater than 5 and with Adjavant treatment
        //of the type Chemothrepy or Radio-chemothrepy
        // /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 1;
        // req.query.userId = 3;
        // //TODO: Rememove above lines
        // /**********************************************************************************/
        var totalPatients = 0;
        var chemoOrRct = 0;
        var others = 0;
        var missing = 0;
   
        var sqlQuery = "";        
    
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Surgery (Query First loop opinion): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q194_item" and formulaire_item.valeur_item > 0 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Surgery (Query First loop opinion):: Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q194_item" and formulaire_item.valeur_item > 0 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Surgery (Query First loop opinion):: All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q203_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q194_item" and formulaire_item.valeur_item > 0 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item != 6 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }        
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
    
            for (var i in result) 
            {                
                totalPatients++;
                console.log("Data:" + result[i].Value);
                switch(result[i].Value)
                {
                    case '0':
                    case '3':
                    case '4':
                            others++;
                            break;
                    case '1': 
                    case '2':
                            chemoOrRct++;
                            break;
                    default:missing++
                            break;
                };  
            }
            
            var resObj = {                
                totalPatients:totalPatients,
                chemoOrRct:chemoOrRct,
                others:others,
                missing:missing,
                note:"Classification of the curative patients with Traitement adjuvant of type 1 OR 2 and having the Clavien J90 score not equal to 5 and number of ganglions invaded > 0"                
                };
            res.json(resObj);                 
        });
    }   
 

};   
module.exports = TreatmentAdjav;




