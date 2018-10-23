//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Global = {

    //Global View ROW 2
    global: function (req, res) {
       /********************************************************* */  
        console.log( req.query.startDate); 
        console.log( req.query.endDate);
        console.log( req.query.formType);
        console.log( req.query.userLevel);
        console.log( req.query.userId);    


        // var startDate = "2018-01-01";
        // var endDate = "2019-01-01";        
        // var reqObj = {startDate:startDate,
        //             endDate:endDate,
        //             formType:'E',
        //             UnitType:2,
        //             userId:38};  
        /********************************************************* */
        var totalPatients = 0;
        var curativeCount = 0;
        var palliCount = 0;
        var nACount = 0;
        var missCount = 0;
        
        // var AllUnitQuery = 'SELECT patient.id,formulaire_item.valeur_item as itemValue,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ reqObj.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ reqObj.startDate + '" AND "'+ reqObj.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';    
        var AllUnitQuery = 'SELECT patient.id,formulaire_item.valeur_item as itemValue,formulaire.id, formulaire.id_patient, formulaire.id_organe,formulaire_item.id_formulaire,formulaire_item.id,formulaire_item.valeur_item,item.intitule,organe.id, organe.code from patient , formulaire, formulaire_item, item, organe where ((patient.id = formulaire.id_patient) AND (formulaire.id_organe = organe.id AND organe.code = "'+ req.query.formType +'" ) AND ((formulaire.id = formulaire_item.id_formulaire) AND (formulaire.date_creation BETWEEN "'+ req.query.startDate + '" AND "'+ req.query.endDate +'") AND (item.intitule = "Résection" AND formulaire_item.id_item = item.id)))';       
        db.query(AllUnitQuery,function (error,result, fields) 
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
    }
  
};
   
module.exports = Global;