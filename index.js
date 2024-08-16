import { connect } from "mongoose";
import express from "express";
import cors from 'cors'; 
import notesRouter from "./backend/router/notes.js";
import usersRouter from "./backend/router/user.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connect("mongodb://127.0.0.1:27017/notes-app")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

// Start the server
app.listen(5005, () => {
    console.log("Server started at port 5005");
});
