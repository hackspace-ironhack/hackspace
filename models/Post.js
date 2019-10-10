//model for post on profile
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  post: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  postedOn: Date,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Post = model("Post", postSchema);

module.exports = Post;
