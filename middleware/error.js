const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  const response = {
    message: "Internal server error. Please try again later.",
    status: 500,
    timestamp: new Date().toISOString(),
    requestUrl: req.originalUrl,
  };

  res.status(response.status).json(response);
};
