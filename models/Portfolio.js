const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const portfolioSchema = new Schema({
  title: String,
  tools:String,
  description: String,
  link: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
