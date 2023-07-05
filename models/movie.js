const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },

    subscriptionRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    subscriberCount: {
      type: Number,
      default: 0,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    subscriptionRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie, { abortEarly: false });
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
