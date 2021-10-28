const express = require("express");
const router = express.Router();

const Todos = require("../models/todosModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// sign up user
router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.send({ error: "please fill al fields" });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          res.send({ error: "Email already exists" });
        } else {
          const newUser = new User({ email, password });
          newUser.save();

          res.status(201).json({ newUser, msg: "Created Your Account, Login" });
        }
      });
    }
  } catch (error) {
    res.status(400);
    return error;
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // send inputted email& password to static method in userModel
    const user = await User.loginUser(email, password);
    // create jwt token
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ jwt: token, user: user._id });
  } catch (error) {
    res.status(400).json({ error: "Wrong email or password" });
    return error;
  }
});

// get all
router.get("/api/todoApp", async function (req, res, next) {
  const allTodos = await Todos.find({});
  res.status(200).json({ allTodos });
});
// get users todo
router.get("/api/todoApp/user/:userId", async function (req, res, next) {
  const { userId } = req.params;
  const usersTodos = await Todos.find({ user: userId });
  res.status(200).json({ usersTodos });
});

// add new
router.post("/api/todoApp/new", async (req, res) => {
  const newTodo = Todos(req.body);
  await newTodo.save();
  res.json(newTodo);
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
