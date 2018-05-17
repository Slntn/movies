const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const path = require('path');
app.use(express.static(path.join(__dirname,'/dist')));

const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');
mongoose.connection.on('connected', () => console.log('connected to MongoDB'));

mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'The movie title is required'],
    minlength: [1, 'The movie title length must be greater than 3'],
    unique: true
  },
  reviews: {
    required: true,
    type: [{
    userName:{
      type: String,
      trim: true,
      required: [true, 'The user name is required'],
      minlength: [3, 'The user name length must be greater than 3'],
    },
    text: {
      type: String,
      trim: true,
      required: [true, 'The review is required'],
      minlength: [3, 'The content of a review must be at least 3 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'The rating is required'],
      min: [1, 'The rating must be between 1 and 5 stars'],
      max: [5, 'The rating must be between 1 and 5 stars']
    }
  }]}
});

movieSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });
const Movie = mongoose.model('Movie', movieSchema);

const movieController = {
  findall: (req, res) => {
    Movie.find({})
      .then(data => res.json(data))
      .catch(error => console.log(error));
  },
  create: (req, res) => {
    Movie.create(req.body)
      .then(movie => res.json(movie))
      .catch(error => console.log(error));
  },
  findMovie: (req, res) => {
    Movie.find({_id: req.params.id})
      .then(data => res.json(data))
      .catch(error => console.log(error));
  },
  update: (req, res) => {
    Movie.update({_id: req.params.id}, {$push: {'reviews': req.body }})
      .catch(error => console.log(error));
  },
  delete: (req, res) =>{
    Movie.remove({title : req.params.title})
    .catch(error => console.log(error));
  }
};

app
  .get('/api/movies', movieController.findall)
  .get('/api/movies/:id', movieController.findMovie)
  .post('/api/create', movieController.create)
  .post('/api/review/:id', movieController.update)
  .delete('/api/delete/:title', movieController.delete)
  .all("*", (req, res, next) => {
    res.sendFile(path.resolve("./dist/index.html"))
  });;

app.listen(port , () => {console.log(`listening on port ${port}`)});
