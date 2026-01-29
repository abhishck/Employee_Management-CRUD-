import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },
    email:{
        type:String,
        required:[true,"Please enter a valid email"]
    },
    contact:{
        type:Number,
        required:[true,"Please enter a number"]
    },
    department:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const empModel= mongoose.model("employee",EmployeeSchema);

export default empModel;