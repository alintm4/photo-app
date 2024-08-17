import express from "express";
import {
  createNewNote,
  deleteNote,
  findAllNotes,
  findNote,
  updateNote,
} from "../controller/notes.js";
import dotenv from "dotenv";
dotenv.config();

import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", findAllNotes);

router.get("/:id", findNote);

router.post("/", verifyToken, createNewNote);

router.patch("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
