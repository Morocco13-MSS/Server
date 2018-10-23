//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Global = {
    global: function (req, res)
    {
        var totalPatients = 0;
        var curativeCount = 0;
        var palliCount = 0;
        var nACount = 0;
        var missCount = 0;
        var sqlQuery = "";
        
        //userLevel  0-doc, 1-unit, 2-all
        //userId (Doctor Id or respective unitId)

        if(req.query.userLevel == 0) //For a particular doctor
        {
            sqlQuery = 'SELECT patient.id,formulaire_item.valeur_item as itemValue,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ req.query.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';
        }
        else if(req.query.userLevel == 1) //Across the unit/hospital
        {
            sqlQuery = 'SELECT patient.id,formulaire_item.valeur_item as itemValue,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ req.query.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';
        }
        else(req.query.userLevel == 2) //Across all the units/hospitals
        {
            sqlQuery = 'SELECT patient.id,formulaire_item.valeur_item as itemValue,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ req.query.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';
        }
        console.log(req.query.userLevel);
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;
            for (var i in result) 
            {
                totalPatients++;
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