const express = require("express");
const router = express.Router();
const UsersSchema = require("./../schema/users_schema");
const jwt = require("jsonwebtoken");

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UsersSchema.find().lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get my profile
router.post("/me", async (req, res) => {
  // console.log(req.body);
  const token = req.cookies.auth_token || req.body.token;

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await UsersSchema.findOne({ _id: decoded.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;