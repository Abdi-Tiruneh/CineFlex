const express = require("express");
const config = require("config");
const app = express();

require("./startUp/routes")(app);
require("./startUp/db")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
