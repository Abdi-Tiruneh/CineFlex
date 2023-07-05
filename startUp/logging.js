const winston = require("winston");
const config = require("config");
require("express-async-errors");
require("winston-mongodb");

module.exports = function () {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "logfile.log" }),
      new winston.transports.MongoDB({
        level: "info",
        options: { useUnifiedTopology: true },
        db: config.get("db"),
      }),
    ],
  });

  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
