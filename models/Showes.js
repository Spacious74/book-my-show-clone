const mongoose = require('mongoose');

const showsSchema = new mongoose.Schema({
    theaterId : {
        type : mongoose.Schema.ObjectId,
        ref : "Theatres",
        required : true
    },
    theatreName : String,
    movieList : [
        { 
            movieId : {
                type : mongoose.Schema.ObjectId,
                ref : "Movies",
                required : true
            }, 
            movieName : String,
            // Movie id here
            showTimingsAndSeats : [
                {
                    // _id : fashdhfkjjhq23khkj67
                    showTime : String,
                    bookedSeats : [String],
                }
            ]
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
const Shows = mongoose.model("Shows", showsSchema);
module.exports = Shows;