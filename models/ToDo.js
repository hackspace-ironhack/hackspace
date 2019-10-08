const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" }
});

const ToDo = model("ToDo", todoSchema);

module.exports = ToDo;
