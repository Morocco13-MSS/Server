//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Global = {

    //Global View ROW 2
    global: function (req, res) {
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
        db.query(queryString,function (error,result, fields) 
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