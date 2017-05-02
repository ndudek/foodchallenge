var express = require('express');
var app = express ();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var active_challenge = require('./data.js');
var active_challenge;


//static file capability
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//handlers for get request / in browser
// app.get('click', function())

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/foodchallenge');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DATABASE CONNECTED!!');
});

//DEFINE SCHEMA - schema constructor function
var Schema = mongoose.Schema;

//challenge table (adminChallenge)
var challengeSchema = new Schema({
  name: String,
  description: String,
  dos: String,
  donts: String
});

//active_challenge table
var active_challengeSchema = new Schema({
  challenge_id: Number,
  name: String,
  start_date: { type: Date, default: Date.now },
  current_date: { type: Date, default: Date.now },
  points: Number,
  daystreak: Number
});

//past_challenge table
var past_challengeSchema = new Schema({
  challenge_id: Number,
  name: String,
  date: { type: Date, default: Date.now },
  points: Number,
  daystreak: Number
});

//user table
var userSchema = new Schema({
  user_id: Number,
  name: String,
  gender: String,
  location: String,
  active_challenge: String,
  past_challenges: Number
});



//TELL MONGOOSE THERE IS A NEW MODEL - register a model - name of model = car using carSchema (mongoose model function)

var Challenge = mongoose.model('Challenge', challengeSchema);
var ActiveChallenge = mongoose.model('ActiveChallenge', active_challengeSchema);
var PastChallenge = mongoose.model('PastChallenge', past_challengeSchema);
var User = mongoose.model('User', userSchema);



// ROUTES
// ==============================================
//you can use mongo to type it directly in command line
//Robomongo:
app.get('/challenge', function(req, res, next){
  if (!active_challenge){
    res.status(404).json({ message: 'You have no challenge selected' });
  }
  res.json(challenge);
  // ActiveChallenge.find({}).exec(function(err, activechallenge){
  //   res.send({type:'GET'});
  //   if(err){
  //     return res.status(500).send(err);
  //     console.log('cannot find');
  //   }
  //   return res.status(200).send(activechallenge);
  // });
});

app.get('/challenge/:current_date', function(req, res){
  var requestCurrentDate = req.params.current_date;
  var date = active_challenge.filter(function(date){
  //var newArray = arr.filter(callback[, thisArg])
    return active_challenge.current_date == requestCurrentDate;
  })

  res.json(active_challenge[3]);
  });





//next is a 3rd parameter sth you were given want to pass to the next piece of middleware
//next(); it will jump out of function and do the next thing
//request always goes on 1st position how you name the parameter doe snot matter

//Collection of objects
  // var cars = [{
  //   name: 'Ferrari'
  //   }, {
  //   name:'Bugatti'
  //   }
  // ];
  //console.log('My IP is ', req.ip); //there is more that can be returned
  //return res.send('Hello');

//POST is used for admins when adding new challenges in
app.post ('/challenge', function(req, res){
  console.log(req.body); // send the body back to myself
  // we are only
  // var newCAr = req.body;
  // if(newCar.type === "bugatti"); do stuff
  var challengeData = req.body;
  var newChallenge = new Challenge(challengeData);
  newChallenge.save(function(err, model){
    if(err){
      return res.status(500).send(err);
    }
    return res.sendStatus(201);
  })
});




app.put ('/challenge/:', function(req, res){
  return res.send('PUT');

});


app.delete ('/challenge', function(req, res){
var challengeToBeRemovedId = req.body.id;

  ActiveChallenge.remove({ _id: challengeToBeRemovedId }, function(){
    if(err){
      return res.status(500).send(err);
    }
    return res.sendStatus(204);
  })
});


// function a(){}
// function b(){}
//
// a(b(a));
// pass the outer function into inner

// START THE SERVER
// ==============================================

app.listen(3333, function(){
  console.log('App listening');
});


// go to pstoman and make request to same
