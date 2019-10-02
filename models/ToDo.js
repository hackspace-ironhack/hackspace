const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" }
});

const ToDo = model("ToDo", taskSchema);

module.exports = ToDo;
