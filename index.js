import { connect } from "mongoose";
import express from "express"
import cors from 'cors'; 
import router from "./backend/router/notes";
import routers from "./backend/router/user";
const app=express()

app.use(express.json())
app.use(cors());

connect("mongodb://127.0.0.1:27017/notes-app")
.then(()=> console.log("mongo db connected"))
.catch((err) => console.log("Mongodb error:", err));

app.use("api/notes",router);
app.use("/api/users",routers)


app.listen(4001,()=>{
    console.log("Server started at port 40001")
})