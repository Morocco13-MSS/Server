//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Global = {
    global: function (req, res)
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
};
   
module.exports = Global;




