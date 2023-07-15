const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Theatre = require('../models/Theatre')
const Movie = require('../models/Movies');


const getAllTheatre = async (req, res) => {
    try {
        const theatres = await Theatre.find();
        res.status(200).send({
            theatres
        });
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }
}

const getTheatreById = async (req, res) => {
    const id = req.params.theatreId;
    try {
        const theatre = await Theatre.findOne({_id: id});
        res.status(200).send(theatre);

    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}

const getTheatreMoviesById = async (req, res) => {
    const id = req.params.theatreId;
    try {
        const theatre = await Theatre.findOne({_id: id});
        const theatreMovies = theatre.movies;
        // const arrObjs = [];
        // for(let i = 0 ; i < theatreMovies.length; i++) {
        //     let mId = theatreMovies[i].movieId;
        //     let movie = await Movie.findOne({_id: mId});
        //     arrObjs.push(movie);
        // }
        res.status(200).send(theatreMovies);

    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}


const createTheatre = async (req,res) =>{

    const theatre = req.body
    try {
        const theatreCreation = await Theatre.create({
            name : theatre.name,
            location : theatre.location,
            description : theatre.description,
            pincode : theatre.pincode,
            movies : theatre.movies
        });
        res.status(200).send({
            message : 'Theatre registered successfully',
            theatre : theatreCreation
        });
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}

const updateTheatre = async (req,res) =>{

    const id = req.params.id;
    const theatreBody = req.body;
    try {
        const theatre = await Theatre.findOneAndUpdate({_id : id}, theatreBody);
        res.status(200).send({
            message : "Theatre updated successfully"
        })
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }

}


const deleteTheatre = async (req,res) =>{
    const id = req.params.id;
    try {
        const theatre = await Theatre.findByIdAndDelete({_id : id});
        res.status(200).send({
            message : "Theatre deleted successfully"
        })
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }
}

module.exports = {
    createTheatre,
    updateTheatre,
    deleteTheatre,
    getAllTheatre,
    getTheatreById,
    getTheatreMoviesById
}