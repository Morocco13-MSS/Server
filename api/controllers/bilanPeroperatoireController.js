//include the model (DB connection)
var db = require('../models/dbconnection'); 

//userLevel  0-doc, 1-unit, 2-all
//userId (Doctor Id or respective unitId)

//create class
var bp = {
    // tumeur: function (req, res)
    // {
    //     //--------------------API parameter examples--------------------/
    //     // var reqObj = {
    //     //     startDate: req.query.startDate,
    //     //     endDate: req.query.endDate,
    //     //     formType: req.query.formType,
    //     //     userLevel: req.query.userLevel,
    //     //     userId :req.query.userId,
    //     // };

    //     /**********************************************************************************/
    //     //TODO: only required for unit testing
    //     req.query.startDate = "2018-01-01";
    //     req.query.endDate = "2019-01-01";
    //     req.query.formType = "E";
    //     //userLevel  0-doc, 1-unit, 2-all
    //     //userId (Doctor Id or respective unitId)
    //     req.query.userLevel = 2;
    //     req.query.userId = 8;
    //     //TODO: Rememove above lines
    //     /**********************************************************************************/

    //     var totalPatients = 0;
    //     var adherentCount = 0;
    //     var nonAdherentCount = 0;
    //     var missCount = 0;
    //     var sqlQuery = "";
        

    //     if(req.query.userLevel == 0) //For a particular doctor
    //     {
    //         sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as tumeur,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Siège de la tumeur" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire'
    //     }
    //     else if(req.query.userLevel == 1) //Across the unit/hospital
    //     {
    //         sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tumeur,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Siège de la tumeur" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    //     }
    //     else //Across all the units/hospitals
    //     {
    //         sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tumeur,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Siège de la tumeur" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    //     }
    //     console.log(req.query.userLevel);
    //     console.log(sqlQuery);

    //     console.log(req.query.userLevel);
    //     db.query(sqlQuery,function (error,result, fields) 
    //     {
    //         if (error) throw error;
    //         for (var i in result) 
    //         {
    //             totalPatients++;
    //             if(result[i].mdt == "09/09/9999") { //answer is no
    //                 nonAdherentCount++;
    //             }
    //             else if(result[i].mdt != "09/09/9999") { //answer is yes
    //                 adherentCount++;
    //             }
    //             else if(result[i].mdt == 999) { //missing
    //                 missCount++;
    //             }
    //         } 
    //         var resObj  = {
    //                         totalPatients:totalPatients,
    //                         adherentCount:adherentCount,
    //                         nonAdherentCount:nonAdherentCount,
    //                         missCount,missCount};
    //         res.json(resObj);         
    //     });
    // },
    mdt: function (req, res)
    {
        var totalPatients = 0;
        var adherentCount = 0;
        var nonAdherentCount = 0;
        var missCount = 0;
        var sqlQuery = "";
        

        if(req.query.userLevel == 0) //For a particular doctor
        {
            sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as mdt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Date RCP avant le début du traitement" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire'
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as mdt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Date RCP avant le début du traitement" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as mdt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "Date RCP avant le début du traitement" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        console.log(req.query.userLevel);
        console.log(sqlQuery);

        console.log(req.query.userLevel);
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;
                if(result[i].mdt == "09/09/9999") { //answer is no
                    nonAdherentCount++;
                }
                else if(result[i].mdt != "09/09/9999") { //answer is yes
                    adherentCount++;
                }
                else if(result[i].mdt == 999) { //missing
                    missCount++;
                }
            } 
            var resObj  = {
                            totalPatients:totalPatients,
                            adherentCount:adherentCount,
                            nonAdherentCount:nonAdherentCount,
                            missCount,missCount};
            res.json(resObj);         
        });
    },
    tdmThoracique: function (req, res)
    {

        var totalPatients = 0;
        var adherentCount = 0;
        var nonAdherentCount = 0;
        var missCount = 0;
        var sqlQuery = "";
        

        if(req.query.userLevel == 0) //For a particular doctor
        {
            sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as tdmt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM thoracique" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire'
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tdmt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM thoracique" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tdmt,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM thoracique" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        console.log(req.query.userLevel);
        console.log(sqlQuery);

        console.log(req.query.userLevel);
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;
                if(result[i].tdmt == 0) { //answer is no
                    nonAdherentCount++;
                }
                else if(result[i].tdmt == 1) { //answer is yes
                    adherentCount++;
                }
                else if(result[i].tdmt == 999) { //missing
                    missCount++;
                }
            } 
            var resObj  = {
                            totalPatients:totalPatients,
                            adherentCount:adherentCount,
                            nonAdherentCount:nonAdherentCount,
                            missCount,missCount};
            res.json(resObj);         
        });
    },
    tdmAbdominale: function (req, res)
    {

        var totalPatients = 0;
        var adherentCount = 0;
        var nonAdherentCount = 0;
        var missCount = 0;
        var sqlQuery = "";

        if(req.query.userLevel == 0) //For a particular doctor
        {
            sqlQuery = 'SELECT item.intitule,formulaire_item.valeur_item as tdma,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM abdominale" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire'
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tdma,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM abdominale" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        else //Across all the units/hospitals
        {
            sqlQuery='SELECT item.intitule,formulaire_item.valeur_item as tdma,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.intitule = "TDM abdominale" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
        }
        console.log(req.query.userLevel);
        console.log(sqlQuery);

        console.log(req.query.userLevel);
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;
                if(result[i].tdma == 0) { //answer is no
                    nonAdherentCount++;
                }
                else if(result[i].tdma == 1) { //answer is yes
                    adherentCount++;
                }
                else if(result[i].tdma == 999) { //missing
                    missCount++;
                }
            } 
            var resObj  = {
                            totalPatients:totalPatients,
                            adherentCount:adherentCount,
                            nonAdherentCount:nonAdherentCount,
                            missCount,missCount};
            res.json(resObj);         
        });
    },

    //Neo-adjuvant treatment
  neoAdjuvant: function (req, res)
  {            
   /**********************************************************************************/
//    //TODO: only required for unit testing
//    req.query.startDate = "2018-01-01";
//    req.query.endDate = "2019-01-01";
//    req.query.formType = "E";
//    //userLevel  0-doc, 1-unit, 2-all
//    //userId (Doctor Id or respective unitId)
//    req.query.userLevel = 2;
//    req.query.userId = 8;
//    //TODO: Rememove above lines
   /**********************************************************************************/
   var totalPatients = 0;
   var neoAdjuvant = 0;
   
           
   var sqlQuery = "";        

   if(req.query.userLevel == 0) //For a particular doctor
   {
       console.log("Surgery (Query lumphNodeExamCount): Doctor Level View "+ req.query.userLevel);
       sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q75_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else if(req.query.userLevel == 1) //Across the unit/hospital
   {
       console.log("Surgery (Query  lumphNodeExamCount):: Doctor's Hospital view "+ req.query.userLevel);
       sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q75_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }
   else //Across all the units/hospitals
   {
       console.log("Surgery (Query  lumphNodeExamCount):: All Hospitals view "+ req.query.userLevel);
       sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q75_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
   }        
   db.query(sqlQuery,function (error,result, fields) 
   {
       if (error) throw error;

       for (var i in result) 
       {
            totalPatients++;
            if(result[i].Value == 1)
            {
                neoAdjuvant++;      
            }
       }         
            
       var resObj = {
           totalPatients:totalPatients,
           neoAdjuvant:neoAdjuvant,                              
           };
       res.json(resObj);                 
   });   
  }
  ,
    //Number of days between the end of neo-adjavant treatment and the start of the surgery
    daysBeforeSurgery: function (req, res)
    {            
    /**********************************************************************************/
    // //TODO: only required for unit testing
    // req.query.startDate = "2018-01-01";
    // req.query.endDate = "2019-01-01";
    // req.query.formType = "E";
    // //userLevel  0-doc, 1-unit, 2-all
    // //userId (Doctor Id or respective unitId)
    // req.query.userLevel = 0;
    // req.query.userId = 8;
    // //TODO: Rememove above lines
    /**********************************************************************************/
    var totalPatients = 0;
    var lt6weeks = 0;  
    var gt8weeks = 0;
    var six2etweeks = 0;
    var missing = 0;
    var sqlQuery = "";        

    if(req.query.userLevel == 0) //For a particular doctor
    {
        console.log("Surgery (Query lumphNodeExamCount): Doctor Level View "+ req.query.userLevel);
        sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q87_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    }
    else if(req.query.userLevel == 1) //Across the unit/hospital
    {
        console.log("Surgery (Query  lumphNodeExamCount):: Doctor's Hospital view "+ req.query.userLevel);
        sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q87_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    }
    else //Across all the units/hospitals
    {
        console.log("Surgery (Query  lumphNodeExamCount):: All Hospitals view "+ req.query.userLevel);
        sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q87_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    }        
    db.query(sqlQuery,function (error,result, fields) 
    {
        if (error) throw error;

        for (var i in result) 
        {
            totalPatients++;
            //missing count
            if(result[i].Value == 999)
            {
                missing++;
            }
            else if(result[i].Value < 42) // less than 6 weeks
            {
                lt6weeks++;
            }
            else if(result[i].Value > 56) // greater than 8 weeks
            {
                gt8weeks++;
            }
            else
            {
                six2etweeks++; //between 6 to 8 weeks
            }
        }         
            
        var resObj = {
            totalPatients:totalPatients,
            lt6weeks:lt6weeks,
            gt8weeks:gt8weeks,
            six2etweeks:six2etweeks,
            missing,missing
            };
        res.json(resObj);                 
    });   
    }    
  
};
   
module.exports = bp;