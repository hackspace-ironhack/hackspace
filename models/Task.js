const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: String,
  tools: String,
  description: String,
  link:String,
  project: { type: Schema.Types.ObjectId, ref: "Project" }
});

const Task = model("Task", taskSchema);

module.exports = Task;
