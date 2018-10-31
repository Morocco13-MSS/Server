//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Surgery = {
    //Résection = "Curatif" and % Types de geste ==> Use the "/global/gestType" API

    firsLook: function (req, res)
    {
        //Résection = "Curatif"	% Voie d'abord (q96_item)
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
        var laparotomie = 0;
        var laparoscopie = 0;
        var laparo_scopie_tomie = 0;
        var missingCount = 0;
   
        var sqlQuery = "";        
    
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Surgery (Query First loop opinion): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q96_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item < 5 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Surgery (Query First loop opinion):: Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q96_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.code="q231_item" and formulaire_item.valeur_item < 5 and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Surgery (Query First loop opinion):: All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q96_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                    case '0': laparotomie++;
                            break;
                    case '1': laparoscopie++;
                            break;
                    case '2': laparo_scopie_tomie++;
                            break;                    
                    default:missingCount++
                            break;
                };              
    
            }
            
            var resObj = {
                totalPatients:totalPatients,
                laparotomie:laparotomie,
                laparoscopie:laparoscopie,
                laparo_scopie_tomie:laparo_scopie_tomie                                 
                };
            res.json(resObj);                 
        });
    }
    ,
       
    //Résection = "Curatif"	% Résection associée 
    resecAsso: function (req, res)
    {            
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
        var noResecCount = 0;
        var localResec = 0;
        var RemoteResec = 0;
        var localRemoteCnt = 0;
        var naCount = 0;
        var missing = 0;
                
        var sqlQuery = "";        
    
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Surgery (Query Resection associated): Doctor Level View "+ req.query.userLevel);
            sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q135_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Surgery (Query Resection associated):: Doctor's Hospital view "+ req.query.userLevel);
            sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q135_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            console.log("Surgery (Query Resection associated):: All Hospitals view "+ req.query.userLevel);
            sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q135_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                    case '0': noResecCount++;
                            break;
                    case '1': localResec++;
                            break;
                    case '2': RemoteResec++;
                            break;
                    case '3': localRemoteCnt++;
                            break;
                    case '4': naCount++;
                            break;
                    default: missing++
                            break;
                };              
    
            }                
            var resObj = {
                totalPatients:totalPatients,
                noResecCount:noResecCount,
                localResec:localResec,
                RemoteResec:RemoteResec,
                localRemoteCnt:localRemoteCnt,
                naCount:naCount,
                missing:missing                             
                };
            res.json(resObj);                 
        });
    }
    ,

    //% Peforation
    perforation: function (req, res)
    {            
    //  /**********************************************************************************/
    //  //TODO: only required for unit testing
    //  req.query.startDate = "2018-01-01";
    //  req.query.endDate = "2019-01-01";
    //  req.query.formType = "E";
    //  //userLevel  0-doc, 1-unit, 2-all
    //  //userId (Doctor Id or respective unitId)
    //  req.query.userLevel = 1;
    //  req.query.userId = 3;
    //  //TODO: Rememove above lines
    //  /**********************************************************************************/
     var totalPatients = 0;
     var yesCount = 0;
     var noCount = 0;
     var missing = 0;
             
     var sqlQuery = "";        
 
     if(req.query.userLevel == 0) //For a particular doctor
     {
         console.log("Surgery (Query Perforation): Doctor Level View "+ req.query.userLevel);
         sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q146_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else if(req.query.userLevel == 1) //Across the unit/hospital
     {
         console.log("Surgery (Query Perforation):: Doctor's Hospital view "+ req.query.userLevel);
         sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q146_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else //Across all the units/hospitals
     {
         console.log("Surgery (Query Perforation):: All Hospitals view "+ req.query.userLevel);
         sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q146_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                 case '0': noCount++;
                         break;
                 case '1': yesCount++;
                         break;
                 default: missing++
                         break;
             };              
 
         }                
         var resObj = {
             totalPatients:totalPatients,
             noCount:noCount,
             yesCount:yesCount,
             missing:missing,                              
             };
         res.json(resObj);                 
     });
    }   
    ,
    
    //% Contamination
    contamination: function (req, res)
    {            
    //  /**********************************************************************************/
    //  //TODO: only required for unit testing
    //  req.query.startDate = "2018-01-01";
    //  req.query.endDate = "2019-01-01";
    //  req.query.formType = "E";
    //  //userLevel  0-doc, 1-unit, 2-all
    //  //userId (Doctor Id or respective unitId)
    //  req.query.userLevel = 1;
    //  req.query.userId = 3;
    //  //TODO: Rememove above lines
     /**********************************************************************************/
     var totalPatients = 0;
     var yesCount = 0;
     var noCount = 0;
     var missing = 0;
             
     var sqlQuery = "";        
 
     if(req.query.userLevel == 0) //For a particular doctor
     {
         console.log("Surgery (Query contamination): Doctor Level View "+ req.query.userLevel);
         sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q146_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else if(req.query.userLevel == 1) //Across the unit/hospital
     {
         console.log("Surgery (Query contamination):: Doctor's Hospital view "+ req.query.userLevel);
         sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q147_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else //Across all the units/hospitals
     {
         console.log("Surgery (Query contamination):: All Hospitals view "+ req.query.userLevel);
         sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q147_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                 case '0': noCount++;
                         break;
                 case '1': yesCount++;
                         break;
                 default: missing++
                         break;
             };              
 
         }                
         var resObj = {
             totalPatients:totalPatients,
             noCount:noCount,
             yesCount:yesCount,
             missing:missing,                              
             };
         res.json(resObj);                 
     });
    }   
    ,

    //Intraoperative transfusion
    intraTrans: function (req, res)
    {            
    //  /**********************************************************************************/
    //  //TODO: only required for unit testing
    //  req.query.startDate = "2018-01-01";
    //  req.query.endDate = "2019-01-01";
    //  req.query.formType = "E";
    //  //userLevel  0-doc, 1-unit, 2-all
    //  //userId (Doctor Id or respective unitId)
    //  req.query.userLevel = 1;
    //  req.query.userId = 3;
    //  //TODO: Rememove above lines
    //  /**********************************************************************************/
     var totalPatients = 0;
     var yesCount = 0;
     var noCount = 0;
     var missing = 0;
             
     var sqlQuery = "";        
 
     if(req.query.userLevel == 0) //For a particular doctor
     {
         console.log("Surgery (Query Resection associated): Doctor Level View "+ req.query.userLevel);
         sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q152_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else if(req.query.userLevel == 1) //Across the unit/hospital
     {
         console.log("Surgery (Query Resection associated):: Doctor's Hospital view "+ req.query.userLevel);
         sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q152_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else //Across all the units/hospitals
     {
         console.log("Surgery (Query Resection associated):: All Hospitals view "+ req.query.userLevel);
         sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q152_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                 case '0': noCount++;
                         break;
                 case '1': yesCount++;
                         break;
                 default: missing++
                         break;
             };              
 
         }                
         var resObj = {
             totalPatients:totalPatients,
             noCount:noCount,
             yesCount:yesCount,
             missing:missing,                              
             };
         res.json(resObj);                 
     });
    }
    ,

    //Mean Pertes sanguines moyennes (Average Blood Loss)
    averageBloodLoss: function (req, res)
    {            
    //  /**********************************************************************************/
    //  //TODO: only required for unit testing
    //  req.query.startDate = "2018-01-01";
    //  req.query.endDate = "2019-01-01";
    //  req.query.formType = "E";
    //  //userLevel  0-doc, 1-unit, 2-all
    //  //userId (Doctor Id or respective unitId)
    //  req.query.userLevel = 1;
    //  req.query.userId = 3;
    //  //TODO: Rememove above lines
    //  /**********************************************************************************/
     var totalPatients = 0;
     var averageBLoss = 0;
     var missing = 0;
             
     var sqlQuery = "";        
 
     if(req.query.userLevel == 0) //For a particular doctor
     {
         console.log("Surgery (Query Average Blood Loss): Doctor Level View "+ req.query.userLevel);
         sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q149_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else if(req.query.userLevel == 1) //Across the unit/hospital
     {
         console.log("Surgery (Query  Average Blood Loss):: Doctor's Hospital view "+ req.query.userLevel);
         sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q149_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }
     else //Across all the units/hospitals
     {
         console.log("Surgery (Query  Average Blood Loss):: All Hospitals view "+ req.query.userLevel);
         sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q149_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
     }        
     db.query(sqlQuery,function (error,result, fields) 
     {
         if (error) throw error;
 
         for (var i in result) 
         {
             totalPatients++;
             var loss = parseInt(result[i].Value) ;                   
             if(loss != 999)
             {
                averageBLoss = (averageBLoss + loss);
             }
             else
             {
                 missing++;
             }
         }         
         averageBLoss = averageBLoss / totalPatients;         
         var resObj = {
             totalPatients:totalPatients,
             averageBLoss:averageBLoss,             
             missing:missing,                              
             };
         res.json(resObj);                 
     });
    }       
,

  //radicality R1 percentage
  radicalityR1: function (req, res)
  {            
//    /**********************************************************************************/
//    //TODO: only required for unit testing
//    req.query.startDate = "2018-01-01";
//    req.query.endDate = "2019-01-01";
//    req.query.formType = "E";
//    //userLevel  0-doc, 1-unit, 2-all
//    //userId (Doctor Id or respective unitId)
//    req.query.userLevel = 2;
//    req.query.userId = 3;
//    //TODO: Rememove above lines
//    /**********************************************************************************/
   var totalPatients = 0;
   var radicalityR1 = 0;
   var others = 0;
   var missing = 0;
           
   var sqlQuery = "";        

   if(req.query.userLevel == 0) //For a particular doctor
   {
       console.log("Surgery (Query radicalityR1): Doctor Level View "+ req.query.userLevel);
       sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q202_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else if(req.query.userLevel == 1) //Across the unit/hospital
   {
       console.log("Surgery (Query  radicalityR1):: Doctor's Hospital view "+ req.query.userLevel);
       sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q202_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else //Across all the units/hospitals
   {
       console.log("Surgery (Query  radicalityR1):: All Hospitals view "+ req.query.userLevel);
       sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q202_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }        
   db.query(sqlQuery,function (error,result, fields) 
   {
       if (error) throw error;

       for (var i in result) 
       {
            totalPatients++;
            switch(result[i].Value)
                {
                    case '0':                     
                    case '2': 
                    case '3': 
                             others++;
                             break;
                    case '1': 
                             radicalityR1++;
                             break;
                    default: missing++
                             break;
                };     
       }         
            
       var resObj = {
           totalPatients:totalPatients,
           radicalityR1:radicalityR1,
           others:others,      
           missing:missing,                              
           };
       res.json(resObj);                 
   });   
  }       
    ,

  //Number of lymph nodes examined
  lumphNodeExamCount: function (req, res)
  {            
//    /**********************************************************************************/
//    //TODO: only required for unit testing
//    req.query.startDate = "2018-01-01";
//    req.query.endDate = "2019-01-01";
//    req.query.formType = "E";
//    //userLevel  0-doc, 1-unit, 2-all
//    //userId (Doctor Id or respective unitId)
//    req.query.userLevel = 2;
//    req.query.userId = 3;
//    //TODO: Rememove above lines
//    /**********************************************************************************/
   var totalPatients = 0;
   var examinCountgt12 = 0;
   var missing = 0;
           
   var sqlQuery = "";        

   if(req.query.userLevel == 0) //For a particular doctor
   {
       console.log("Surgery (Query lumphNodeExamCount): Doctor Level View "+ req.query.userLevel);
       sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q193_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else if(req.query.userLevel == 1) //Across the unit/hospital
   {
       console.log("Surgery (Query  lumphNodeExamCount):: Doctor's Hospital view "+ req.query.userLevel);
       sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q193_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id_service="'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else //Across all the units/hospitals
   {
       console.log("Surgery (Query  lumphNodeExamCount):: All Hospitals view "+ req.query.userLevel);
       sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q193_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }        
   db.query(sqlQuery,function (error,result, fields) 
   {
       if (error) throw error;

       for (var i in result) 
       {
            totalPatients++;
            if(result[i].Value >= 12)
            {
                examinCountgt12++;      
            }
       }         
            
       var resObj = {
           totalPatients:totalPatients,
           examinCountgt12:examinCountgt12,                              
           };
       res.json(resObj);                 
   });   
  }  

};   
module.exports = Surgery;




