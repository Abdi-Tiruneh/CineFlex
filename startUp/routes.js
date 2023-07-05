const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const customers = require("../routes/customer");
const genres = require("../routes/genres");
const movies = require("../routes/movie");
const subscription = require("../routes/subscription");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/subscription", subscription);
  app.use("/api/auth", auth);
  app.use(error);
};
