const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const Theatre = require('../models/Theatre')
const Movie = require('../models/Movies');
const Shows = require('../models/Showes')


const getAllTheatre = async (req, res) => {
    try {
        const theatres = await Theatre.find();
        res.status(200).send(theatres);
    } catch (error) {
        res.staus(400).send({
            message : "Error : " + error.message
        })
    }
}

const getTheatreByUserLocation = async (req, res)=>{
    try{

        const location = req.params.location;
        const theatres = await Theatre.find({address : {location : location}});
        res.status(200).send(theatres);

    }catch(er){
        res.status(400).send({
            message : "Error : " + er.message
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


const getTheatreListByMovieId = async (req, res) => {

    const movieId = req.params.movieId;

    try {
        const theatreList = [];
        
        const theatreShows = await Shows.find();

        theatreShows.map((showObj)=>{
            const movieIdArr = showObj.movieList.map((mObj)=>{
               return String(mObj.movieId)
            });

            if(movieIdArr.includes(movieId)){
                let showTimings = [];
                
                showObj.movieList.forEach((sObj)=>{
                    if(String(sObj.movieId) === movieId){
                        showTimings = [...sObj.showTimingsAndSeats]
                    }
                })
                let obj = {
                    theatreId : showObj.theaterId,
                    theatreName : showObj.theatreName,
                    showTiming : showTimings
                }
                theatreList.push(obj);
            }

        })

        

        res.status(200).send(theatreList);

    } catch (err) {
        res.status(400).send({
            message: "Error : " + err.message
        });
    }
}

const createTheatre = async (req,res) =>{

    const theatre = req.body

    const faciArr = theatre.facilities.split(",");
    try {
        const theatreCreation = await Theatre.create({
            name : theatre.name,
            facilities : faciArr,
            address : {
                location : theatre.location,
                pincode : theatre.pincode,
                city : theatre.city
            }, 
            seatArrangement : {
                rows : theatre.rows,
                cols : theatre.cols
            }
        });

        await Shows.create({
            theaterId : theatreCreation._id,
            theatreName : theatreCreation.name,
            movieList : []
        })

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
    getTheatreByUserLocation,
    getTheatreListByMovieId
}