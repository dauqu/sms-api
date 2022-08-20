const express = require("express");
const router = express.Router();
const SMSSchema = require("./../schema/sms_schema");

//Get all news
router.get("/", async (req, res) => {
  try {
    const news = await SMSSchema.find().lean();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
  const sms = new SMSSchema({
    sms: req.body.sms,
    sender: req.body.sender,
    code: req.body.code,
    time: req.body.time,
    name: req.body.name,
  });
  try {
    await sms.save();
    res
      .status(201)
      .json({ message: "SMS created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  const sms = await SMSSchema.findById(req.params.id);
  if (!sms) return res.status(404).json({ message: "SMS not found" });
  try {
    await sms.remove();
    res.status(200).json({ message: "SMS deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
