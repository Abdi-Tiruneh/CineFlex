const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const response = {
      message: "Invalid ID.",
      status: 400,
      timestamp: new Date().toISOString(),
      requestUrl: req.originalUrl,
    };

    return res.status(response.status).json(response);
  }

  next();
};
