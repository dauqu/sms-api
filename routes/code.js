const express = require("express");
const router = express.Router();
const RoomSchema = require("./../schema/room_schema");

//Get all room
router.get("/", async (req, res) => {
  try {
    const room = await RoomSchema.find().lean();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
    console.log(req.body);
  const room = new RoomSchema({
    code: req.body.code,
    description: req.body.description,
  });
  try {
    await room.save();
    res
      .status(201)
      .json({ message: "Room created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One
router.delete("/:id", async (req, res) => {
  const room = await RoomSchema.findById(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });
  try {
    await room.remove();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Find One
router.get("/:code", async (req, res) => {
  const room = await RoomSchema.findById({
    code: req.params.code,
  });
  if (!room) return res.status(404).json({ message: "Room not found" });
  try {
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
