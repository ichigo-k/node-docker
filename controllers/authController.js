import User from "../models/userModel.js";
import bcrypt from "bcrypt"

export  async function signUp(req, res){
    try{
        const  {username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username, password: hashedPassword
        })
        req.session.user = user
        res.status(201).json({success:true, data:{user}})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}


export  async function login(req, res){
    try{
        const {username, password} = req.body
        const user = await User.findOne({username: username})
        if(!user) return res.status(404).json({success:true, message:"User not found"})
       const isCorrect =await  bcrypt.compare(password, user.password)
        if (!isCorrect) return res.status(400).json({success:false, message:"Invalid credentials "})
        req.session.user = user
        res.status(200).json({success:true, data: {user}})
    }catch (err){
        res.status(500).json({success: false, message:"Something went wrong"})
        console.log(err)
    }
}


