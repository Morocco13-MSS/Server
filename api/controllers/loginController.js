//include the model (DB connection)
var db = require('../models/dbconnection'); 

//create class
var Login = {
    login: function (req, res)
    {
        // var reqObj = 
        // {
        //     userName:"majbar",
        //     passwd:"XYZ"
        // };
        //TODO: No vaidation of password is done
        var sqlQuery = 'select nom_prenom as Name ,id as Id, id_service as UnitId  from utilisateur where  utilisateur.nom_utilisateur ="'+ req.query.userName +'"';         
        db.query(sqlQuery,function (error,result, fields) 
        {
            if (error) throw error;            
            var resObj  = { 
                            name:result[0].Name,                           
                            userId:result[0].Id,
                            UnitId:result[0].UnitId
                          };                            
            res.json(resObj);         
        });
    }
};
   
module.exports = Login;




