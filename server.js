const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./routers/usersRouter");

const server = express();

const sessionConfig = {
  name: "webAuthName",
  secret: "this is a secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: require("./data/db-config"),
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 90
  })
};

server.use(helmet());
server.use(bodyParser.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);

module.exports = server;
