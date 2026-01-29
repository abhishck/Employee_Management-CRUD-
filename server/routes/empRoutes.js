import express from "express"
import { addEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from "../controllers/empController.js";

const router=express.Router();

router.post("/",addEmployee)
router.get("/",getEmployees)
router.get("/:id",getEmployeeById)
router.put("/:id",updateEmployee)
router.delete("/:id",deleteEmployee)

export default router;