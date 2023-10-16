const express = require('express');
const db = require('./db');
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const dealsController = require('./controllers/dealController')
const usersController = require('./controllers/userController')
const commentsController = require('./controllers/commentController');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.send('This is root'))

//GET
app.get('/deals', dealsController.getAllDeals)
app.get('/deals/:id', dealsController.getOneDeal)
app.get('/users', usersController.getAllUsers)
app.get('/users/:id', usersController.getOneUser)
app.get('/comments', commentsController.getAllComments)
app.get('/comments/:id', commentsController.getOneComment)

//Extended
app.post('comments',  commentsController.createComment)
app.put('/users/:id/wishlist-add', usersController.addToWishlist)
app.delete('/users/:id/wishlist-delete', usersController.deleteFromWishlist)
app.get('/users/:id/exists-on-wishlist', usersController.existsOnWishlist )
app.put('/deals/:id', dealsController.addToCommentsList)




app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))