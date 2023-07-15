const express = require('express');
const allRoutes = express.Router();
const movieRouter = require('./movie.route');
const theatreRouter = require('./theatre.route')


allRoutes.use('/bookmyshow/api/v1/movie', movieRouter);
allRoutes.use('/bookmyshow/api/v1/theatre', theatreRouter);

allRoutes.use('/bookmyshow/api/v1/', (req,res)=>{
    res.status(200).send({
        message : "Home page"
    })
})


module.exports = allRoutes;