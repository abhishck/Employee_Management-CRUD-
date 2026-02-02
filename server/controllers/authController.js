import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
 
const register=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            res.status(400);
            throw new Error("All Fields Are Mandatory !!");
        }
        const existingUser=await userModel.findOne({email});
        if(!existingUser){
            res.status(400);
            throw new Error("user already registered!!");
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=new userModel({
            name,
            email,
            password:hashedPassword ,
            role
        })

        await user.save();

        const token= jwt.sign({user:{id:user._id,email:user.email},})
        return res.status(201).json({success:true,message:"user Created successfully!!"})
    } catch (error) {
        
    }
}