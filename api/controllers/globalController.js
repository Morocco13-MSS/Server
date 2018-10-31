//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Global = {
    global: function (req, res)
    {
        /**********************************************************************************/
        // //TODO: only required for unit testing
        // req.query.startDate = "2018-01-01";
        // req.query.endDate = "2019-01-01";
        // req.query.formType = "E";
        // //userLevel  0-doc, 1-unit, 2-all
        // //userId (Doctor Id or respective unitId)
        // req.query.userLevel = 2;
        // req.query.userId = 1;
        // //TODO: Rememove above lines
        /**********************************************************************************/
        var totalPatients = 0;
        var curativeCount = 0;
        var palliCount = 0;
        var nACount = 0;
        var missCount = 0;
        var sqlQuery = "";
        
        if(req.query.userLevel == 0) //For a particular doctor
        {
            console.log("Global , Doctor Level View "+ req.query.userLevel);
            
            sqlQuery = 'select distinct(formulaire_item.id_formulaire), formulaire_item.valeur_item as itemValue from formulaire,formulaire_item,item ,organe where (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and ( item.intitule = "Résection" and organe.code="'+ req.query.formType +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item )and (organe.id = formulaire.id_organe and formulaire.id = formulaire_item.id_formulaire AND item.id=formulaire_item.id_item)';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            console.log("Global, Hospital Level " + req.query.userLevel );
            sqlQuery = 'select distinct(formulaire_item.id_formulaire), formulaire_item.valeur_item as itemValue from formulaire,formulaire_item,item ,organe where (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and (item.intitule = "Résection" and organe.code="'+ req.query.formType +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur  where utilisateur.id_service = "'+ req.query.userId +'" and utilisateur.doctorCode=medecin.doctorCode and formulaire_item.valeur_item=medecin.id and item.intitule="Opérateur1" and item.id=formulaire_item.id_item ) and (organe.id = formulaire.id_organe and formulaire.id = formulaire_item.id_formulaire AND item.id=formulaire_item.id_item)'
            
        }
        else //Across all the units/hospitals
        {
            console.log("Global, All Hospital Level "+ req.query.userLevel);
            sqlQuery = 'SELECT patient.id,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item as itemValue,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ req.query.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';
        }   

        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;
                console.log(result[i].itemValue);
                if(result[i].itemValue == 0) { //No applicable
                    nACount++;
                }
                else if(result[i].itemValue == 1) { //A visée curative
                    curativeCount++;
                }
                else if(result[i].itemValue == 2) { //Palliative
                    palliCount++;
                }
                else
                    missCount++;
            } 
            var resObj  = {
                            totalPatients:totalPatients,
                            curativeCount:curativeCount,
                            palliCount:palliCount,
                            nACount:nACount,
                            missCount,missCount};
            res.json(resObj);         
        });
    }
    ,

    //Gloabal View Curative patients with type of Gestation details
    gestType: function (req, res){
    /**********************************************************************************/
    // //TODO: only required for unit testing
    // req.query.startDate = "2018-01-01";
    // req.query.endDate = "2019-01-01";
    // req.query.formType = "E";
    // //userLevel  0-doc, 1-unit, 2-all
    // //userId (Doctor Id or respective unitId)
    // req.query.userLevel =1;
    // req.query.userId =3;
    // //TODO: Rememove above lines
    /**********************************************************************************/
    var totalPatients = 0;
    var colectomyRight = 0;
    var colectomieTrans = 0;
    var colectomy_left_high=0;
    var sigmoidectomy = 0;
    var hemicolectomy_left = 0;
    var colectomy_total = 0;
    var coloproctectomy = 0;
    var internal_deri = 0;
    var ostomy_alone = 0;
    var explorer = 0;
    var naCount = 0;
    
    var sqlQuery = "";        

    if(req.query.userLevel == 0) //For a particular doctor
    {
        console.log("Global (Query the type of Gestation): Doctor Level View "+ req.query.userLevel);
        sqlQuery = 'SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q100_item"  and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1"   and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item,utilisateur where formulaire_item.valeur_item=medecin.id and utilisateur.id = "'+ req.query.userId +'" and utilisateur.doctorCode= medecin.doctorCode and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item)    and item.id=formulaire_item.id_item  and formulaire.id = formulaire_item.id_formulaire )and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    }
    else if(req.query.userLevel == 1) //Across the unit/hospital
    {
        console.log("Global (Query the type of Gestation): Doctor's Hospital view "+ req.query.userLevel);
        sqlQuery='SELECT item.code as Code, item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q100_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'")  and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,medecin,item where formulaire_item.valeur_item=medecin.id and medecin.id_service="'+ req.query.userId +'" and item.intitule="Opérateur1" AND item.id=formulaire_item.id_item ) and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
    }
    else //Across all the units/hospitals
    {
        console.log("Global (Query the type of Gestation): All Hospitals view "+ req.query.userLevel);
        sqlQuery='SELECT item.code , item.intitule,formulaire_item.valeur_item as Value,formulaire_item.id_formulaire FROM `item`,`formulaire_item`,formulaire,organe WHERE item.code = "q100_item" and organe.code = "'+ req.query.formType +'" and (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") and formulaire_item.id_formulaire in (select formulaire_item.id_formulaire from formulaire_item,item,formulaire where item.intitule="Résection" and formulaire_item.valeur_item="1" and item.id=formulaire_item.id_item and formulaire.id = formulaire_item.id_formulaire ) and item.id=formulaire_item.id_item and formulaire.id_organe=organe.id and formulaire.id=formulaire_item.id_formulaire';
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
                case '0': colectomyRight++;
                        break;
                case '1': colectomieTrans++;
                        break;
                case '2': colectomy_left_high++;
                        break;
                case '3': sigmoidectomy++;
                        break;
                case '4': hemicolectomy_left++;
                        break;
                case '5': colectomy_total++;
                        break;
                case '6': coloproctectomy++;
                        break;
                case '7': internal_deri++;
                        break;
                case '8': ostomy_alone++;
                        break;
                case '9': explorer++;
                        break;
                default:naCount++
                        break;
            };

        }
        
        var resObj = {
            totalPatients:totalPatients,
            colectomyRight:colectomyRight,
            colectomieTrans:colectomieTrans ,
            colectomy_left_high:colectomy_left_high,
            sigmoidectomy:sigmoidectomy,
            hemicolectomy_left:hemicolectomy_left,                
            colectomy_total:colectomy_total,                     
            coloproctectomy:coloproctectomy,
            internal_deri:internal_deri,
            ostomy_alone:ostomy_alone,
            explorer:explorer,
            naCount:naCount,                 
            };
        res.json(resObj);                 
    });

    }
};



module.exports = Global;




