import mongoose from "mongoose";

const notes_Schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content_title: {
    type: String,
    required: true,
  },
  thumbnail: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", notes_Schema);

export default Note;
