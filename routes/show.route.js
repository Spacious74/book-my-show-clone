const express = require('express');
const showRouter = express.Router();
const controller = require('../controllers/show.controller');

showRouter.get('/:movieId', controller.getMovieShowTimings);
showRouter.get('/show-time/:showTimeId', controller.getSeatsOfShowTime);
showRouter.get('/theatre-shows/:theatreId', controller.getTheatreShows);

showRouter.post('/:theatreId', controller.createShows)

module.exports = showRouter;