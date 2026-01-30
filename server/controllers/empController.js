import empModel from "../models/employeeModel.js";

export const addEmployee = async (req, res,next) => {
  try {
    let { name, email, contact, department } = req.body;
    if (!name || !email || !contact || !department) {
      res.status(400);
      throw new Error("All Fields are mandatory");
    }

    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();
    department = department.trim();

    if(contact.length !== 10){
      res.status(400);
      throw new Error("contact must contain 10 numbers!!")
    }

    const existingEmp = await empModel.findOne({ email });
    if (existingEmp) {
      res.status(400)
      throw new Error("Email already exists")
    }

    const emp = new empModel({
      name,
      email,
      contact,
      department,
    });
    await emp.save();
    return res.status(201).json({
      success: true,
      message: "employee registered successfully!!",
    });
  } catch (err) {
    console.log("add employee error:", err);
    // return res.json({ success: false, message: "error occurred!" });
    next(err);
  }
};

export const getEmployees = async (req, res,next) => {
  try {
    const emps = await empModel.find();
    return res.json({ success: true, employees: emps });
  } catch (err) {
    console.log("get employees error:", err);
    next(err);
  }
};

export const getEmployeeById = async (req, res,next) => {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400);
        throw new Error("invalid id!!")
    }
    const emp = await empModel.findById(id);
    if (!emp) {
      res.status(404);
      throw new Error("employee not found !!")
    }
    return res.json({ success: true, employee: emp });
  } catch (err) {
    console.log("get employee error:", err);
   next(err);
  }
};

export const updateEmployee = async (req, res,next) => {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400);
        throw new Error("invalid id!!")
    }
    const emp = await empModel.findById(id);
    if (!emp) {
       res.status(404);
      throw new Error("employee not found !!")
    }
    const updatedEmployee = await empModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({ success: true, employee: updatedEmployee });
  } catch (err) {
    console.log("update employee error:", err);
   next(err);
  }
};

export const deleteEmployee = async (req, res,next) => {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400);
        throw new Error("invalid id!!")
    }
    const emp = await empModel.findById(id);
    if (!emp) {
      res.status(404);
      throw new Error("employee not found !!")
    }
    const deleted = await empModel.findByIdAndDelete(id);
    return res.json({ success: true, employee: deleted });
  } catch (err) {
    console.log("delete employee error:", err);
   next(err);
  }
};
