//model for post on profile
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  post: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const Post = model("Post", postSchema);

module.exports = Post;
