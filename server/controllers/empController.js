import empModel from "../models/employeeModel.js";

export const addEmployee = async (req, res) => {
  try {
    let { name, email, contact, department } = req.body;
    if (!name || !email || !contact || !department) {
      return res.status(400)
      throw new Error("All Fields are mandatory");
    }

    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();

    const existingEmp = await empModel.findOne({ email });
    if (existingEmp) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const emp = new empModel({
      name,
      email,
      contact,
      department,
    });
    await emp.save();
    return res.status(200).json({
      success: true,
      message: "employee registered successfully!!",
    });
  } catch (err) {
    console.log("add employee error:", err);
    return res.json({ success: false, message: "error occurred!" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const emps = await empModel.find();
    return res.json({ success: true, employees: emps });
  } catch (err) {
    console.log("add employee error:", err);
    return res.json({ success: false, message: "error occurred!" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await empModel.findById(id);
    if (!emp) {
      return res.json({ success: false, message: "employee not found !!" });
    }
    return res.json({ success: true, employee: emp });
  } catch (err) {
    console.log("add employee error:", err);
    return res.json({ success: false, message: "error occurred!" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await empModel.findById(id);
    if (!emp) {
      return res.json({ success: false, message: "employee not found !!" });
    }
    const updatedEmployee = await empModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({ success: true, employee: updatedEmployee });
  } catch (err) {
    console.log("add employee error:", err);
    return res.json({ success: false, message: "error occurred!" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await empModel.findById(id);
    if (!emp) {
      return res.json({ success: false, message: "employee not found !!" });
    }
    const deleted = await empModel.findByIdAndDelete(id);
    return res.json({ success: true, employee: deleted });
  } catch (err) {
    console.log("add employee error:", err);
    return res.json({ success: false, message: "error occurred!" });
  }
};
