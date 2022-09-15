const mongoose = require("mongoose");

//Schema
const RoomSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("roomcode", RoomSchema);
