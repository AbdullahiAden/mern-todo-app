var express = require("express");
var mongoose = require("mongoose");
var bycrypt = require("bcryptjs");
var router = express.Router();

const Todos = require("../models/todosModel");
const User = require("../models/userModel");

// db config
mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((error) => {});

router.use(express.urlencoded({ extended: true }));

// sign up user
router.post("/signUp",  (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({ error: "please fill al fields" });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          res.send({ error: "Email already exists" });
        } else {
          const newUser = new User({ email, password });
          newUser.save();
          res.status(200).json({ data: newUser });
          // res.redirect("/");
        }
      });
    }
  } catch (error) {
    return error;
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log({email:email, password:password});
  res.status(200);
  res.json({success: "Login Page"});
});

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
