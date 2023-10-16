const express = require('express');
const db = require('./config');
const logger = require('morgan')
const bodyParser = require('body-paraser')
const cors = require('cors')

const actorsController = require('./controllers/dealController')
const moviesController = require('./controllers/userController')
const reviewsController = require('./controllers/reviewController');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())


app.get('/', actorsController.getAllActors)

app.get('/actors', actorsController.getAllActors)
app.get('/actors/:id', actorsController.getOneActor)
app.get('/movies', moviesController.getAllMovies)
app.get('/movies/:id', moviesController.getOneMovie)
app.get('/reviews', reviewsController.getAllReviews)
app.get('/reviews/:id', reviewsController.getOneReview)



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))