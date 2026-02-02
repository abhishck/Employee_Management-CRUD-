import jwt from "jsonwebtoken"

const validateToken=(req,res,next)=>{
    let token;
    const authHeader=req.header.authorization || req.header.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,decoded)=>{
           if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
       req.user = decoded.user;
      next();
        })
    }
    else {
    res.status(401);
    throw new Error("Token missing");
  }
}

export default validateToken