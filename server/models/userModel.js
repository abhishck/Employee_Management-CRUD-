import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      ]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength: 6,
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
},{
    timestamps:true
})

const userModel=mongoose.model("user",userSchema);

export default userModel;