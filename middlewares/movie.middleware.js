const Movie = require('../models/Movies')

const validateMovie = async (req,res, next)=>{


    const moviebody = req.body;
    if(!moviebody.name || !moviebody.desc || !moviebody.genre || !moviebody.releaseDate
        || !moviebody.cast || !moviebody.releaseStatus || !moviebody.movieLength 
        || !moviebody.rating || !moviebody.posterImage || !moviebody.videoTrailer
        || !moviebody.language) {
            res.status(400).send({
                message : "Please provide all information"
            })
            return;
    }

    const isAlreadyExist = await Movie.findOne({name : req.body.name})
    if(isAlreadyExist){
        res.status(400).send({
            message : "Movie already exists"
        })
        return;
    }

    next();

}

module.exports = {
    validateMovie
}