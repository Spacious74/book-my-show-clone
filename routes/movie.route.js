const express = require('express');
const movieRouter = express.Router();
const movieMiddleware = require('../middlewares/movie.middleware')
const movieController = require('../controllers/movie.controller')
const upload = require('../middlewares/multer')

movieRouter.get('/', movieController.getAllMovies)
movieRouter.get('/:movieId',movieController.getMovieById);
movieRouter.get('/genre/:genre', movieController.getMovieByGenres);


movieRouter.post('/',[upload, movieMiddleware.validateMovie],movieController.createMovie)
movieRouter.put('/:id', movieController.updateMovie);
movieRouter.delete('/:id', movieController.deleteMovie)

module.exports = movieRouter