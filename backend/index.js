import { connect } from "mongoose";
import express from "express";
import cors from "cors";
import notesRouter from "./router/notes.js";
import usersRouter from "./router/user.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//MongoDB
const mongoURL= process.env.MONGO_URL;
connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

//server
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
