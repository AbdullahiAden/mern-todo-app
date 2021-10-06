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
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((error) => {
    console.log("CONNECTION ERROR");
    console.log(error);
  });

// const tods = [
//   {
//     subject: "shopping",
//     content: "buy shoes and trousers",
//     date: "",
//   },
// ];

// get all
router.get("/api/todoApp", async function (req, res, next) {
  await Todos.find({}, (err, allTodos) => {
    console.log(allTodos);
    res.send({ allTodos });
  });
});
// get single
router.get("/api/todoApp/:id", async function (req, res, next) {
  const { id } = req.params;

  await Todos.find({ _id: id }, (err, singleTodo) => {
    res.send({ singleTodo });
  });
});

// add new
router.post("api/todoApp/new", (req, res) => {
  const { todo } = req.body;
  console.log(todo);

  const newTodo = todosdb({
    title: req.todo,
  });

  if (newTodo) {
    newTodo.save();
    res.send("saved");
  }
  res.send("------");
});

module.exports = router;
