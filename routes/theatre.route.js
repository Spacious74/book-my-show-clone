const express = require('express');
const theatreRouter = express.Router();
const controller = require('../controllers/theatre.controller')

theatreRouter.get('/', controller.getAllTheatre)
theatreRouter.get('/:theatreId',controller.getTheatreById);
theatreRouter.get('/:location',controller.getTheatreByUserLocation);
theatreRouter.get('/movieTime/:movieId',controller.getTheatreListByMovieId);


theatreRouter.post('/',controller.createTheatre);
theatreRouter.put('/:id', controller.updateTheatre);
theatreRouter.delete('/:id', controller.deleteTheatre);


module.exports = theatreRouter;