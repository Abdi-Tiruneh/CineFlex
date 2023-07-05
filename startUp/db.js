const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function () {
  const db = config.get("db");

  mongoose
    .connect("mongodb://127.0.0.1/CineFlex", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}`));
};
