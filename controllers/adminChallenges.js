const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const session = require('express-session');
// get user model from models
let Challenge = require("../models/challenge.js");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());


// get all challenges
router.get("/", (req, res) => {
    // let challenges = Challenge.get
    return res.send("show all challenges!")
});

// render form
router.get("/create", (req, res) => {
    //let create = Challenge.get
    return res.render("pages/adminChallenge/create.hbs");
});

// get challenge by id
router.get("/:id", (req, res) => {
    // let challenge = Challenge.findById(req.params.id, (err, item) => {
    //     if (err)
    //         res.send(err);
    //
    //     console.log(item);
    //     res.render("pages/adminChallenge/detail", item);
    // });
    return res.send("The World is beautiful!")

});


router.post("/", (req, res) => {

    let challenge = new Challenge({
        name: req.body.name,
        display: req.body.display,
        "image-url": req.body.image,
        description: req.body.description,
        dos: req.body.dos,
        donts: req.body.donts,
        multiplier: req.body.multiplier,
        duration: req.body.duration,
        createdAt: new Date(),
        modifiedAt: new Date()
    });
    console.log(JSON.stringify(challenge));


    challenge.save(function(err, item){

        if (err)
            console.log(err);
        let url = `/admin/challenges/${item._id}`;
        console.log(url);
        return res.redirect(url);
    });
});



// var model= {
//     "save": (callback) => {
//         var err, anotherObject = mongodb.someFunctionThatTriesToSave(this);
//
//
//         callback(err, anotherObject)
//     }
// }

// update challenge by id
router.put("/:challengeId", (req, res) => {
    let challenge = {};
});



// delete challenge by id
router.delete("/challengeId", (req, res) => {
    let challenge = {};
});

module.exports = router;