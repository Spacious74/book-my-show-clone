const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Movie = require('../models/Movies');
const cloudinary = require('cloudinary').v2;

const getAllMovies = async (req, res) => {

    const searchText = req.query.searchText;
    const genre = req.query.genre;
    const language = req.query.lan;

    try {

        let query = {};

        if(searchText && searchText !== ""){
            query = { name: { $regex: searchText, $options: 'i' } }
        }

        if(genre && genre !== ""){
            query = { genre: { $regex: genre, $options: 'i' } }
        }

        if(language && language !== ""){
            query = { language: { $regex: language, $options: 'i' } }
        }

        const movies = await Movie.find(query).sort({ createdAt: -1 }).exec();
        res.status(200).send(movies);
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
        res.status(200).send(movie);
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


const customUpload = async (file) => {

    try{
        const result = await cloudinary.uploader.upload(file, {folder : "Movie"});
        return result;
    }catch(err){
        console.log("Error in custom upload file : ", err.message);
    }

}


const createMovie = async (req, res) => {

    const movie = req.body

    const imagesArr = [movie.posterImage, movie.backImage]
    
    const imagesUrl = [];

    try{
        await Promise.all(imagesArr.map(async (image)=>{
            let result = await customUpload(image);
            let obj = {
                public_id : result.public_id,
                url : result.url
            }
            imagesUrl.push(obj);
        }))
    }catch(err){
        console.log("Error in uploading files : " + err.message);
    }

    let castArr = movie.cast.split(",");
    let languageArr = movie.language.split(",");

    try {
        const movieCreation = await Movie.create({
            name : movie.name,
            desc : movie.desc,
            cast : castArr,
            language : languageArr,
            releaseDate : movie.releaseDate,
            releaseStatus : movie.releaseStatus,
            genre : movie.genre,
            movieLength : movie.movieLength,
            rating : movie.rating,
            posterImage : imagesUrl[0],
            backImage : imagesUrl[1],
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