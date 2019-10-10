const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email:String,
    name: String,
    city:String,
    skills:String,
    hobbies:String,
    profilePicture:String,
    uploadMedia:[]
  },
  {
    timestamps: true
  }
);
userSchema.index({name: 'text'})

const User = mongoose.model("User", userSchema);
module.exports = User;
