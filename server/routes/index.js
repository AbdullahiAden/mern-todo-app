var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

const Todos = require("../models/todosModel");

// db config
mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {});

router.use(express.urlencoded({ extended: true }));

// get all
router.get("/api/todoApp", async function (req, res, next) {
  await Todos.find({}, (err, allTodos) => {
    res.send({ allTodos });
  });
});

// add new
router.post("/api/todoApp/new", async (req, res) => {
  const newTodo = Todos(req.body);
  await newTodo.save();
  if (newTodo) {
    res.send({ newTodo });
  }
});

// get single
router.get("/api/todoApp/:id", async function (req, res, next) {
  const { id } = req.params;

  await Todos.find({ _id: id }, (err, singleTodo) => {
    res.send({ singleTodo });
  });
});

// delete todo
router.delete("/api/todoApp/:id", async function (req, res, next) {
  const { id } = req.params;

  await Todos.findByIdAndDelete(id);
  res.redirect("/api/todoApp");
});

module.exports = router;
