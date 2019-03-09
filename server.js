const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helm = require("helmet");

const server = express();
const projectRouter = require("./routes/projects.js");

server.use(express.json());
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`
		<h1>Zach's Sprint Challenge</h1>
	`);
});

module.exports = server;
