const express = require('express');
const theatreRouter = express.Router();
const controller = require('../controllers/theatre.controller')

theatreRouter.get('/', controller.getAllTheatre)
theatreRouter.get('/:theatreId',controller.getTheatreById);
theatreRouter.get('/theatre-movies/:theatreId', controller.getTheatreMoviesById);


theatreRouter.post('/',controller.createTheatre);
theatreRouter.put('/:id', controller.updateTheatre);
theatreRouter.delete('/:id', controller.deleteTheatre);


module.exports = theatreRouter;