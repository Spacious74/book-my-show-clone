const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
    },
    cast : {
        type : [String]
    },
    releaseDate : {
        type : Date,
    },
    releaseStatus : {
        type : String,
        required : true,
        default : "Released"
    },
    genre : {
        type : String,
    },
    language : {
        type : [String]
    },
    movieLength : {
        type : String,
    },
    rating : {
        type : String,
    },
    posterImage : {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        },
    backImage : {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        },
    videoTrailer : String,
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=> Date.now()
    },
    updatedAt : {
        type : Date,
        default : ()=> Date.now()
    } 
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;