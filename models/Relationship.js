const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const relationshipSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
});

const Relationship = model("Relationship", relationshipSchema);

module.exports = Relationship;
