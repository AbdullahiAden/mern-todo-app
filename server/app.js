var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");

dotenv.config({path:"./.env"})

var indexRouter = require("./routes/index");

var app = express();


app.use(cors());
app.use(cors({ origin: true, credentials: true }))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

module.exports = app;
