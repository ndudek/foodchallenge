/**
 * Created by nadjadudek on 29/04/2017.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// challenge table
const challengeSchema = new Schema({
    name: String,
    "image-url": String,
    description: String,
    dos: String,
    donts: String,
    display: { type: Boolean, default: true },
    multiplier: { type: Number, default: 1.0 },
    duration: { type: Number, default: 7.0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'challenges' });

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;