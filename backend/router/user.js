import User from "../models/user_Schema"
import express from "express"

const routers= express.Router()

routers.post("/register",async (req,res)=>{
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });
user= new User({username,password})
await user.save();
res.status(201).json({message:"new user registered"})
})
routers.post("/login", async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });
    if (password !== user.password) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    
res.status(200).json({message:
    "Login Succesfull"})

})

export default routers