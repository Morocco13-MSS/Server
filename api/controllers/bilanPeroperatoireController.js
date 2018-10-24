//include the model (DB connection)
var db = require('../models/dbconnection'); 
var R = require("r-script");

//create class
var bilanPeroperatoire = {

    //Global View ROW 2
    tdmThorax: function (req, res) {
        var test = "0";
       // var out = R("/Users/linjo/Documents/workspace-neon/mss-server/node_modules/r-script/example/ex-sync.R")
       var out = R("/Users/linjo/Documents/workspace-neon/mss-r-code/R-work/data-set-test.R")
        .data()
        .call(function(err, a) {
            if (err) throw err;
            //console.log(d);
            res.json(a)
        // .callSync();
        // console.log(out);
        });
        
        
//         var resObj  = {
//             totalPatients:totalPatients,
//             curativeCount:curativeCount,
//             palliCount:palliCount,
//             nACount:nACount,
//             missCount,missCount};
// res.json(resObj);   
    

        
        /********************************************************* */  
        //TODO: Remove the below json object and get it as input
        var startDate = "2018-01-01";
        var endDate = "2019-01-01";
        
        var reqObj = {
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            formType: req.query.formType,
            userLevel: req.query.userLevel,
            userId :req.query.userId,
        }; 
        /********************************************************* */
        var totalPatients = 0;
        var adherent = 0;
        var nonAdherent = 0;
        var missing = 0;

        
        var queryString = "select count(distinct p.id) as count from patient p";
        var totalPatientsQueryString = "select count(distinct p.id) as count from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service where i.code = 'q99_item' and fi.valeur_item = 1 and f.date_creation BETWEEN 2018-01-01 AND 2017-01-01 and o.code = 'E' and s.id='3';";
        var adherentQueryString = "select count(distinct p.id) as count from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service WHERE i.code = 'q34_item' and fi.valeur_item = 1 and p.id in (select distinct p.id from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service where i.code = 'q99_item' and fi.valeur_item = 1 and f.date_creation BETWEEN 2018-01-01 AND 2017-01-01 and o.code = 'E' and s.id='3');";
        var nonAdherentQueryString = "select count(distinct p.id) from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service WHERE i.code = 'q34_item' and fi.valeur_item = 0 and p.id in (select distinct p.id from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service where i.code = 'q99_item' and fi.valeur_item = 1 and f.date_creation BETWEEN 2018-01-01 AND 2017-01-01 and o.code = 'E' and s.id='3');";
        var missingQueryString = "select count(distinct p.id) from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service WHERE i.code = 'q34_item' and fi.valeur_item = 999 and p.id in (select distinct p.id from formulaire_item fi  join formulaire f on f.id = fi.id_formulaire join patient p on p.id = f.id_patient join organe o on o.id = f.id_organe join item i on fi.id_item = i.id join medecin m on fi.valeur_item =m.id and i.intitule= 'Opérateur1' join service s on s.id = m.id_service where i.code = 'q99_item' and fi.valeur_item = 1 and f.date_creation BETWEEN 2018-01-01 AND 2017-01-01 and o.code = 'E' and s.id='3');";

       
        var query = db.query("select count(distinct p.id) as count from patient p");

        //var query = connection.query('SELECT 1; SELECT 2');

// query
//   .on('fields', function(fields, index) {
//     // the fields for the result rows that follow
//   })
//   .on('result', function(row, index) {
//     // index refers to the statement this result belongs to (starts at 0)
//   });

        // query
        //     .on('end', function (error,result, fields)  {
        //         // index refers to the statement this result belongs to (starts at 0)
        //         if (error) throw error;
        //         var resObj  = {
        //             totalPatients:result[0].count,
        //         };
        //         res.json(resObj);    
        //     });

        // db.query(totalPatientsQueryString, function (error,result, fields) 
        // {
            
        //     if (error) throw error;
        //     var resObj  = {
        //         totalPatients:result[0].count,
        //     };
        //     res.json(resObj);          
     
        //     }    
        // );

        // var query1 = db.query(totalPatientsQueryString);
        
        
        // query1.on('end',function (error,result, fields) 
        // {
            
        //     if (error) throw error;
        //     var resObj  = {
        //         totalPatients:result[0].count,
        //     };
        //     res.json(resObj);          
     
        //     }    
        // );

    //     var query2 =db.query(adherentQueryString);
        
    //     query2.on('end',function (error,result, fields) 
    //     {

    //         if (error) throw error;
    //         var resObj  = {
    //             adherent:result[0].count,
    //         };
    //         res.json(resObj);  
          
     
    //         }    
    //     );

    //     var query3= db.query(nonAdherentQueryString);
        
    //     query3.on('end',function (error,result, fields) 
    //     {
    //         if (error) throw error;
    //         var resObj  = {
    //             nonAdherent:result[0].count,
    //         };
    //         res.json(resObj);  
         
     
    //         }    
    //     );



    //     var query4 = db.query(missingQueryString);
        
    //     query4.on('end',function (error,result, fields) 
    //     {
    //         if (error) throw error;
    //         var resObj  = {
    //             missing:result[0].count,
    //         };
    //         res.json(resObj);     
         
     
    //         }    
    //     );
    },

    //Patients (Curative and age>70)
 //   agegt70: function (req, res) {
        // // console.log(req)
        // /********************************************************* */  
        // //TODO: Remove the below json object and get it as input
        // var startDate = "2018-01-01";
        // var endDate = "2019-01-01";
        // var reqObj = {startDate:startDate,
        //             endDate:endDate};  
        // /********************************************************* */  
        // console.log("startDate:", reqObj.startDate);
        // console.log("endDate:",reqObj.endDate);
        // var CurPatients = 0;
        // var queryString = 'SELECT * FROM `formulaire_item`,`patient`,`item`,`formulaire` WHERE (formulaire.date_creation BETWEEN "'+ reqObj.startDate +'" AND "'+ reqObj.endDate +'")  AND patient.age > 70 && item.intitule = "Résection" && formulaire_item.valeur_item = "1" && formulaire.id_patient=patient.id && formulaire.id = formulaire_item.id_formulaire && formulaire_item.id_item = item.id';
                        
        // db.query(queryString,function (error,result, fields) 
        // {
        //     if (error) throw error;
        //     for (var i in result) 
        //     {
        //     CurPatients++; 
        //     }
        //     var resObj = {patientgt70:CurPatients};
        //     res.json(resObj); //TODO: Need to modify the scripts to send back total curative patients                           
        // }); 
        // //****************************************************************************************
  //  },

    // Patients (Curative and ASA SCORE > 2)
//    asascoregt2: function (req, res){
        // var patientgtasa2 = 0;
        // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
        // db.query(queryString,function (error,result, fields) 
        // {
        //     if (error) throw error;
        //     for (var i in result) 
        //     {
        //       patientgtasa2++;        
        //     }
        //     var resObj = {patientgtasa2:patientgtasa2};
        //     res.json(resObj);  //TODO: Need to modify the scripts to send back total curative patients                             
        // });
  //  },

    // Patients (Curative and OMS > 1)
 //   omsgt1: function (req, res){
        // var patientgtasa2 = 0;
        // res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients 
    
        // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
        // db.query(queryString,function (error,result, fields) 
        // {
        //     if (error) throw error;
        //     for (var i in result) 
        //     {
        //       patientgtasa2++;        
        //     }
        //     var resObj = {patientgtasa2:patientgtasa2};
        //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
        // });
//    },

    //Patients (Curative and (% Underweight (BMI <18) /% Overweight (BMI> 30)))
 //   bmi: function (req, res){
        // var patientgtasa2 = 0;
        // var queryString = 'SELECT item.intitule ,formulaire_item.valeur_item FROM `item`,`formulaire_item` WHERE (item.intitule = "Résection" && formulaire_item.valeur_item = "1" ) and (item.intitule = "Score ASA" && (formulaire_item.valeur_item = "2" || formulaire_item.valeur_item = "3"))'     
        // db.query(queryString,function (error,result, fields) 
        // {
        //     if (error) throw error;
        //     for (var i in result) 
        //     {
        //       patientgtasa2++;        
        //     }
        //     var resObj = {patientgtasa2:patientgtasa2};
        //     res.json(resObj);   //TODO: Need to modify the scripts to send back total curative patients                            
        // });
  //  }
};
   
module.exports = bilanPeroperatoire;