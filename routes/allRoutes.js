const express = require('express');
const allRoutes = express.Router();

const movieRouter = require('./movie.route');
const theatreRouter = require('./theatre.route')
const userRouter = require('./user.route')
const showRouter = require('./show.route');
const payRouter = require('./pay.route');
const authRouter = require('./auth.route')


allRoutes.use('/bookmyshow/api/v1/movie', movieRouter);
allRoutes.use('/bookmyshow/api/v1/theatre', theatreRouter);
allRoutes.use('/bookmyshow/api/v1/user', userRouter);
allRoutes.use('/bookmyshow/api/v1/shows', showRouter);
allRoutes.use('/bookmyshow/api/v1/payment', payRouter);
allRoutes.use('/bookmyshow/api/v1/auth', authRouter);

allRoutes.use('/bookmyshow/api/v1/', (req,res)=>{
    res.status(200).send({
        message : "Home page"
    })
})


module.exports = allRoutes;