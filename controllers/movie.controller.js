const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Movie = require('../models/Movies');

const getAllMovies = async (req, res) => {

    try {
        const movies = await Movie.find();
        res.status(200).send({
            movies
        });
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }

}

const getMovieById = async (req, res) => {

    const id = req.params.movieId;
    try {
        const movie = await Movie.findOne({_id: id});
        res.status(200).send({
            movie
        });
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }

}

const getMovieByGenres = async (req, res) => {
    const genre = req.params.genre;
    try {
        const movies = await Movie.find({genre : genre});
        res.status(200).send({
            movies
        });
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }
}

const createMovie = async (req, res) => {

    const movie = req.body
    try {
        const movieCreation = await Movie.create({
            name : movie.name,
            desc : movie.desc,
            cast : movie.cast,
            releaseDate : movie.releaseDate,
            releaseStatus : movie.releaseStatus,
            genre : movie.genre,
            movieLength : movie.movieLength,
            rating : movie.rating,
            posterImage : movie.posterImage,
            videoTrailer : movie.videoTrailer
        });
        res.status(200).send({
            message : 'Movie created successfully',
            movie : movieCreation
        });
    } catch (error) {
        res.status(400).send({
            message : "Error : " + error.message
        })
    }


}

const updateMovie = async (req, res) => {

    const id = req.params.id;
    const movieBody = req.body;
    try {
        const movies = await Movie.findByIdAndUpdate({_id : id}, movieBody);
        await movies.save();
        res.status(200).send({
            message : "Movie updated successfully"
        })
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }
    

}

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movies = await Movie.findByIdAndDelete({_id : id});
        res.status(200).send({
            message : "Movie deleted successfully"
        })
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }
}

module.exports = {
    getMovieById,
    getMovieByGenres,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}