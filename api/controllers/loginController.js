//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Login = {
    login: function (req, res)
    {
        var reqObj = 
        {
            userName:"medecin_ino",
            passwd:"XYZ"
        };
        var sqlQuery = 'select id as Id, id_service as UnitId  from utilisateur where  utilisateur.nom_utilisateur ="'+ reqObj.userName +'"';         
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;            
            var resObj  = {                            
                            userId:result[0].Id,
                            UnitId:result[0].UnitId
                          };                            
            res.json(resObj);         
        });
    }
};
   
module.exports = Login;