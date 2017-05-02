const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const session = require('express-session');
// get user model from models
let Challenge = require("../models/challenge.js");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());


// shows challenge list in userprofile
router.get("/select/", (req, res) => {
    Challenge.find(function(err, challenges) {
        if(err) {
            console.log(err);
        } else {
            console.log(challenges);
            return res.render("pages/challenge/list.hbs", {"challenges": challenges});
        }
    });
});


// HBS - User List > get all challenges
router.get("/", (req, res) => {
    Challenge.find(function(err, challenges) {
        if(err) {
            console.log(err);
        } else {
            console.log(challenges);
            return res.render("pages/challenge/list.hbs", {"challenges": challenges});
        }

    });
});


// HBS - Admin View - get challenge by id
router.get("/:id", (req, res) => {
    let challenge = Challenge.findById(req.params.id, (err, item) => {
        if (err)
            res.send(err);
        console.log(item);
        return res.render("pages/challenge/view.hbs", item);
    });

});


module.exports = router;