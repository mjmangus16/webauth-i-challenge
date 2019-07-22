const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("./routers/usersRouter");

const server = express();

server.use(helmet());
server.use(bodyParser.json());
server.use(cors());

server.use("/api/users", usersRouter);

module.exports = server;
