import express from "express"
import { createNewNote, deleteNote, findAllNotes, findNote, updateNote } from "../contoller/notes"

const router=express.Router()

router.get("/",findAllNotes)

router.get("/:id",findNote)


router.post("/",createNewNote)

router.patch("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router;