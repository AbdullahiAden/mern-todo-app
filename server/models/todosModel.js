const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todosSchema);
