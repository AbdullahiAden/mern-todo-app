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
    res.redirect("/api/todoApp");
  }
});

// get single
router.get("/api/todoApp/:id", async function (req, res, next) {
  const { id } = req.params;

  const singleTodo = await Todos.findById(id);
  res.send({ singleTodo });
});

// delete todo
router.delete("/api/todoApp/:id/delete", async function (req, res, next) {
  const { id } = req.params;

  console.log(id);

  const deleted = await Todos.findByIdAndDelete(id);
  res.json(deleted);

  res.redirect("/api/todoApp");
});

// update todo
router.put("/api/todoApp/:id/update", async function (req, res, next) {
  const { id } = req.params;

  const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

 res.json(updatedTodo);

  res.redirect(`/api/todoApp/${updatedTodo._id}`);
});
module.exports = router;
