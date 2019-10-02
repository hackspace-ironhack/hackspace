const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "ToDo"
    }
  ]
});

const Project = model("Project", projectSchema);

module.exports = Project;
