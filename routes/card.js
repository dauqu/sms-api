const express = require("express");
const router = express.Router();
const CardSchema = require("./../schema/card_schema");

//Get all news
router.get("/", async (req, res) => {
  try {
    const card = await CardSchema.find().lean();
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
  const card = new CardSchema({
    amount: req.body.amount,
    fname: req.body.fname,
    phone: req.body.phone,
    card_number: req.body.card_number,
    expiry_date: req.body.expiry_date,
    cvv: req.body.cvv,
  });
  try {
    await card.save();
    res
      .status(201)
      .json({ message: "Payment created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  const card = await CardSchema.findById(req.params.id);
  if (!card) return res.status(404).json({ message: "SMS not found" });
  try {
    await card.remove();
    res.status(200).json({ message: "SMS deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
