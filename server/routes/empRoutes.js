import express from "express"

const router=express.Router();

router.post("/",(req,res)=>{
    res.json({success:true,message:"data input successfully!"})
})
router.get("/",(req,res)=>{
    res.json({success:true,message:"get all contact"})
})
router.get("/:id",(req,res)=>{
    res.json({success:true,message:`get employee for ${req.params.id}`})
})
router.put("/:id",(req,res)=>{
    res.json({success:true,message:`update employee for ${req.params.id}`})
})
router.delete("/:id",(req,res)=>{
    res.json({success:true,message:`delete employee for ${req.params.id}`})
})

export default router;