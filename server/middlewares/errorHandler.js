import { constant } from "../constants.js";
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    res.status(statusCode)
    switch(statusCode){
        case constant.BAD_REQUEST :
            res.json({success:false,title:"Bad Request",err:err.message,stackTrace:err.stack})
            break;
        case constant.VALIDATION :
            res.json({success:false,title:"Validation error",err:err.message,stackTrace:err.stack})
            break;
        case constant.FORBIDDEN :
            res.json({success:false,title:"forbidden",err:err.message,stackTrace:err.stack})
            break;
        case constant.UNAUTHORIZED :
            res.json({success:false,title:"Unauthorized access",err:err.message,stackTrace:err.stack})
            break;
        case constant.INTERNAL_SERVER_ERROR :
            res.json({success:false,title:"internal server error",err:err.message,stackTrace:err.stack})
            break;
        default:
            console.log("All good no error!!")
            break;
    }
}

export default errorHandler;