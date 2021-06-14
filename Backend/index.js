const express = require("express");
const ejs = require("ejs");
const request = require("request");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
app.use(cors());

const formidableMiddleware = require('express-formidable');

app.use(formidableMiddleware());

try {
    mongoose.set('useNewUrlParser', true); //remove deprecation warning
    mongoose.set('useFindAndModify', false); //remove deprecation warning
    mongoose.set('useCreateIndex', true); //remove deprecation warning
    mongoose.set('useUnifiedTopology', true); //remove deprecation warning
    mongoose.connect("mongodb+srv://kds:Password123@cluster0.yyrkq.mongodb.net/football?retryWrites=true&w=majority");
    console.log("Connected to Mongo DB");
}

catch (e) {
    console.log("could not connect");
}

const football_schema = new mongoose.Schema({
    player_name: String,
    club: String,
    country: String,
    position: String,
    goals: Number,
    assists: Number,
    appearances: Number,
    clean_sheets: Number,
    red_cards: Number,
    yellow_cards: Number,
});

const footballer = mongoose.model("footballer", football_schema);

app.get('/', (req, res) => {

    res.json({ "status": "running!!" });

});

app.post("/add_player", function (req, res) {

    /*
        Input: 
            player_name : String,
            club : String,
            country : String,
            position : String,
            goals : Number,
            assists : Number,
            appearances: Number,
            clean_sheets: Number,
            red_cards: Number,
            yellow_cards: Number,

        Output:

            {"success": true}
    */

    var player_details = req.fields;

    const new_player = new footballer(player_details);

    console.log(new_player);

    new_player.save();

    res.json({ "success": true });
});

app.post("/get_all_players", function (req, res) {

    /*
        Input: Nothing,

        Output: example 
        {
    "data": [
        {
            "_id": "60c5f7577d43733298034bb3",
            "player_name": "Mason Mount",
            "club": "Chelsea",
            "country": "England",
            "position": "Midfield",
            "goals": 12,
            "assists": 10,
            "appearances": 36,
            "clean_sheets": 12,
            "red_cards": 2,
            "yellow_cards": 1,
            "__v": 0
        },
        {
            "_id": "60c5fb447d43733298034bb5",
            "player_name": "David Degea ",
            "club": "Manchester United",
            "country": "Spain",
            "position": "Goal Keeper",
            "goals": 0,
            "assists": 2,
            "appearances": 100,
            "clean_sheets": 45,
            "red_cards": 1,
            "yellow_cards": 4,
            "__v": 0
        }
    ]
}
    */
    footballer.find(function (err, data) {

        if (err) {
            console.log(err);
        }
        else {
            res.json({ data });
        }
    });

});

app.post('/update_player', function (req, res) {

    /*
        Input: player_id , the fields which are updated

        Output: {"success":true}
    */

    player_id = req.fields.player_id

    delete req.fields.player_id

    footballer.findByIdAndUpdate(player_id, req.fields, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {

            console.log("Data updated!");
            res.json({ "success": true });
        }
    });
});

app.post('/delete_player', function (req, res) {

    /*
        Input: player_id , of the player to be deleted

        Output: {"success":true}
    */

    footballer.deleteOne({ _id: req.fields.player_id },
        function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ "success": true });
            }
        });
});



app.post('/sort_attribute', function (req, res) {

    /*
        Input: attribue to be sorted, eg:{attribute: goals}

        Output: list of player objects sorted based on goals
    */

    var attribute = req.fields.attribute;

    footballer.find().then((dataArr) => {
        return dataArr.sort((data1, data2) => {
            if (data1[attribute] > data2[attribute]) {
                return 1
            }
            else if (data1[attribute] === data2[attribute]) {
                return 0

            }
            else {
                return -1
            }
        })
    }).then((dataArr) => {
        res.json({
            data: dataArr
        })
    }).catch((e) => {
        console.log(e)
    })
});


app.post("/filter_attribute", function (req, res) {

    /*
        Input: attribue and value

        output: list of player satisying the filter
    */

    var attribute = req.fields.attribute;
    var key = req.fields.key;


    var temp_obj = {};

    temp_obj[attribute]= key;
    
    footballer.find(temp_obj,function (err, data) {

        if (err) {
            console.log(err);
        }
        else {
            res.json({ data });
        }
    });

});

app.listen(3000, () => {
    console.log("Server running at port 3000");
})

