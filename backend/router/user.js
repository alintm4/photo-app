import User from "../models/user_Schema.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const routers = express.Router();
import dotenv from "dotenv";

dotenv.config();

routers.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });

  if (user) return res.status(400).json({ message: "User already exists" });

  user = new User({ username, password });
  const salt = bcrypt.genSaltSync(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({ message: "New user registered", token, refreshToken });
});

routers.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "Invalid username or password" });

  const doPassMatch = await bcrypt.compare(password, user.password);
  if (!doPassMatch) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ message: "Login Successful", token, refreshToken });
});

routers.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ token });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

export default routers;
