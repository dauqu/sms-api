const mongoose = require("mongoose");

//Schema
const SMSSchema = new mongoose.Schema({
  sms: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("sms", SMSSchema);
