const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin) {
    const response = {
      message: "Access denied.",
      status: 403,
      timestamp: new Date().toISOString(),
      requestUrl: req.originalUrl,
    };

    return res.status(response.status).json(response);
  }

  next();
};
