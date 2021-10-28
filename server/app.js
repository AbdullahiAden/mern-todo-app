const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const indexRouter = require("./routes/index");

const app = express();

dotenv.config({ path: "./config.env" });
const database = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
// db config
mongoose.connect(database);

app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

module.exports = app;
