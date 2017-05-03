const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');

// get user model from models
let User = require("../models/user.js");


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

// add session
router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));


// shows create user form
router.get("/create", (req, res) => {
   return res.render("pages/user/create.hbs");
});

// show user profile
router.get("/:username", (req, res) => {

    User.findOne({"username": req.params.username}, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            console.log(user);
            req.session.activeUser = user;
                let pastChallenges; // filter challenges.active == false
            let currentChallenge; // filter challenges.active == true
            return res.render("pages/user/profile.hbs", {"user": user, "currentChallenge": currentChallenge, "pastChallenges": pastChallenges, "session": req.session});
        }
    });
    console.log(req.session);
});



// create new user
router.post("/", (req, res) => {
    let user = new User({
        "username": req.body.username,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "gender": req.body.gender,
        "country": req.body.country
    });
    console.log(JSON.stringify(user));

    user.save((err, item) => {
        if(err)
            console.log(err);
        let url = `/users/create/${item._id}`;
        console.log(url);
        return res.redirect(url);
    });
});



// add challenge to a user profile v2
router.post("/update/", (req, res) => {
    console.log("it works", req.params.username);
    //Get the user find by name or id
    // let user = User.findOne({"username": req.params.username});
    //Gte the
    User.update({username: "nadjadudek"}, {$push: {
        "userChallenges" : [{
            "name": req.body.name,
            "description": req.body.description,
            "dos": req.body.dos,
            "donts": req.body.donts,
            "multiplier": req.body.multiplier,
            "duration": req.body.duration,
            "createdAt": req.body.createdAt,
            "modifiedAt": req.body.modifiedAt
        }]
    }}, function(err, updatedItem){
        console.log(updatedItem);
        //     console.log(err);
        // let addStuff = `/users/${updatedItem.body}`;
        // console.log(addStuff);
        // console.log(JSON.stringify(addStuff));
        //
        // return res.render("pages/user/list.hbs", {"addStuff": addStuff, "session": req.session});

        // _______HELPERS_____
        // query.findOneAndUpdate(conditions, update, callback) // executes
        // ({name: req.user.name}, {$push: {friends: friend}});
        // person.friends.push(person);

        // Message.update({_id: '5064aae4154cb34d14000001' },
        //     {$push: { 'sent-messages' : delivered }},{upsert:true}, function(err, data) {
        //     });
        // _______HELPERS_____

    });
});

// add challenge to a user profile v2
router.post("/:username/challenge/select", (req, res) => {


});


// add challenge to a user profile v2
router.get("/:username/challenge/update", (req, res) => {

    console.log(req.session);
    res.render("pages/user/updateChallenge.hbs", {"username": req.params.username});
});


//
router.put("/:username", (req, res) => {
    var user = User.findById(req.params.username, (err, item) => {
        if (err) {
            res.send(err);
            console.log(item);
        } else {
            item.modifiedAt = new Date();
            item.save(function(err){
                if (err)
                    console.log("error");
                else
                    console.log("success");
            });
        }
    });
});


module.exports = router;