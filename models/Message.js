const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  sentOn: Date
});

const Message = model("Message", messageSchema);

module.exports = Message;
