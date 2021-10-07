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
    res.send({ allTodos });
    // res.render("index", { allTodos });
  });
});

// // serves form
// router.get("/api/todoApp/new", function (req, res, next) {
//   res.render("new");
// });

// add new
router.post("/api/todoApp/new", async (req, res) => {
  console.log(req.body.title);

  const newTodo = Todos(req.body);
  await newTodo.save();
  if (newTodo) {
    res.send({ newTodo });
  }

  // try {
  //   res.send({ newTodo });
  //   res.status(201).json(newTodo);

  //   // res.send({ newTodo });
  // } catch (err) {
  //   res.status(409).json({ err: err });
  // }
});

// get single
router.get("/api/todoApp/:id", async function (req, res, next) {
  const { id } = req.params;

  await Todos.find({ _id: id }, (err, singleTodo) => {
    res.send({ singleTodo });
  });
});

// update

module.exports = router;
