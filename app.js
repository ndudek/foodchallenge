const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// parse application/json
app.use(bodyParser.json());





// set default views directory
app.set("views", path.join(__dirname, "views"));

//set default view engine
app.set("view engine", "hbs");
app.engine("hbs", handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.resolve(__dirname, "views/layouts")
}));


// connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/foodchallenge');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('DATABASE CONNECTED!!');
});




// add controllers
const users = require("./controllers/users.js");
const challenges = require("./controllers/challenges.js");
const adminChallenges = require("./controllers/adminChallenges.js");



app.get("/", (req, res) => {
    res.render('pages/index.hbs', {"name": "Nadja"} );
});


// static file capability
app.use('/static', express.static(path.join(__dirname, 'public')));



// routing controllers (route / resource)
app.use("/users", users);
app.use("/challenges", challenges);
app.use("/admin/challenges", adminChallenges);




// define server port
const port = process.env.PORT || 8000;



// launch server
app.listen(port, () => {
    console.log('Server is listening on 8000');
});


// app.get("/test/:name", (req, res) => {
//     console.log(req.body);
//     fs.writeFile("./testBody.json", JSON.stringify(req.body), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//
//         console.log("The file was saved!");
//     });
// });
