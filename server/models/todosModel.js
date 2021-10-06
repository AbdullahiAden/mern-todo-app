const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosSchema = new mongoose.Schema({
  title: String,
  content: String,
  lastEdited: Date,
});

module.exports = mongoose.model("Todo", todosSchema);
