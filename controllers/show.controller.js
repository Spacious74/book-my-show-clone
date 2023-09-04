const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Theatre = require('../models/Theatre');
const Movie = require('../models/Movies');
const Shows = require('../models/Showes');

const getMovieShowTimings = async (req,res)=>{

    const theatreId = req.query.theatreId;
    const movieId = req.params.movieId;

    try{

        const theaterShows = await Shows.find({theatreId : theatreId});

        const movieListShows = [...theaterShows.movieList]; 
        const shows = [];

        movieListShows.forEach((movieshow)=>{
            if(movieshow.movieId === movieId){
                shows = [...movieshow.showTimingsAndSeats]
            }
        });

        res.status(200).send(shows);

    }catch(err){
        res.status(400).send({
            message : "Error: " + err.message
        })
    }


}

const getTheatreShows = async (req, res)=>{

    const theatreId = req.params.theatreId;
    try{
        const shows = await Shows.findOne({theaterId : theatreId});
        res.status(200).send(shows);
    }catch(err){
        res.status(400).send(err.message);
    }

}


const getSeatsOfShowTime = async (req, res) => {

    const theatreId = req.query.theatreId;
    const movieId = req.query.movieId;
    const showTimeId = req.params.showTimeId;

    try {

        const theaterShows = await Shows.findOne({theaterId : theatreId});
        const movieListShows = theaterShows.movieList; 
        let shows = [];

        movieListShows.forEach((movieshow)=>{
            if(String(movieshow.movieId) === movieId){
                shows = [...movieshow.showTimingsAndSeats]
            }
        });

        let bookedSeatsOfShow = [];

        shows.forEach((show)=>{
            if(String(show._id) === showTimeId){
                bookedSeatsOfShow = shows.bookedSeats
            }
        });

        res.status(200).send({bookedSeatsOfShow, shows});
        

    }catch(err){
        res.status(400).send({
            message : "Error : " + err.message
        })
    }

}


const createShows = async(req,res) =>{

    const theatreId = req.params.theatreId;
    const show = req.body;

    let objArr = [];
    let timeArr = show.time.split(',');
    timeArr = timeArr.map(time => time.trim())

    timeArr.map(time => {
        objArr.push({
            showTime : time,
            bookedSeats : []
        })
    })

    try{

        const movie = await Movie.findOne({_id : show.movieId})
        let obj = {
            movieId : show.movieId,
            movieName : movie.name,
            showTimingsAndSeats : objArr
        }
        const showtoAdd = await Shows.findOne({theaterId : theatreId});
        showtoAdd.movieList.push(obj)
        await showtoAdd.save();
        res.status(200).send({
            message : "Show added to theatre :)"
        });

    }catch(err){
        res.status(400).send({message : err.message});
    }

}

module.exports = {
    getMovieShowTimings,
    getSeatsOfShowTime,
    createShows,
    getTheatreShows 
}