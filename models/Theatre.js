const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    facilities : [], // food and beaverages, mticket, prime seats, etc...
    address : {
        location : {
            type : String,
        },
        pincode : {
            type : Number,
            required : true
        },
        city : {
            type : String
        }
    },
    seatArrangement : {
        rows : Number,
        cols : Number
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=> Date.now()
    },
    updatedAt : {
        type : Date,
        default : ()=> Date.now()
    } 
});

const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;