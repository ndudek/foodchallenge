/**
 * Created by nadjadudek on 29/04/2017.
 */
const mongoose = require("mongoose");
const extend = require("mongoose-schema-extend");
const Schema = mongoose.Schema;


//user challenge table
const challengeSchema = require("./challenge.js").schema;


const userChallengeSchema = challengeSchema.extend({
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    activityRecords: [Number],
    points: Number,
    challengeCancelled: { type: Boolean, default: false },
    challengeSuccess: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});


//user table
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    gender: String,
    country: String,
    userChallenges: {
        type: [userChallengeSchema], default: [] },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
}, { collection: 'users' });

const User = mongoose.model("User", userSchema);

module.exports = User;




