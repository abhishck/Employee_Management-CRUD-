import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
 
export const register=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            res.status(400);
            throw new Error("All Fields Are Mandatory !!");
        }
        const existingUser=await userModel.findOne({email});
        if(existingUser){
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

        const token= jwt.sign({user:{id:user._id,email:user.email,role:user.role}},process.env.JWT_ACCESS_TOKEN,{expiresIn:"5m"})
        return res.status(201).json({success:true,message:"user Created successfully!!",token:token})
    } catch (error) {
        console.log("register error: ",error);
        next(error);
    }
}


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    // password is select:false → must explicitly select
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "5m" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token:token
    });

  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

