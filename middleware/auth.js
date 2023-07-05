const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) {
    const response = {
      message: "Access denied. No token provided.",
      status: 401,
      timestamp: new Date().toISOString(),
      requestUrl: req.originalUrl,
    };

    return res.status(response.status).json(response);
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
