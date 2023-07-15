const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    location : {
        type : String,
    },
    description : {
        type : String,
    },
    pincode : {
        type : Number,
        required : true
    },
    movies : [
        {
            movieId : {
                type : mongoose.Schema.ObjectId,
                ref : "Movies",
                required : true
            },
            movieName : String,
        }
    ],
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