const mongoose = require("mongoose");

//Schema
const CardSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  card_number: {
    type: Number,
    required: true,
  },
  expiry_date: {
    type: String,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("card", CardSchema);
