'use strict';

exports.getPatientAge = function(req, res) {
    //TODO: This is the place you need to retrive data from database
        //For exampleL: req.params.ageRange will be used a paratmeter from UI
        //res will be the response result back to UI

    var asaResult = {
        asa: {
            gt2: 90,
            others: 57,
            missing: 10
        },
        data2: [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
        ],
        data3: [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 9, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
          ]

    }
    res.send(asaResult); //json
};