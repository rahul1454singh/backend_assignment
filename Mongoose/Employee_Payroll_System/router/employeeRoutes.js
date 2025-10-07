const express = require("express");
const router = express.Router();
const Employee = require("../models/hii");



router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeID: req.params.id });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updates = {};
    if (req.body.salary) updates.salary = req.body.salary;
    if (req.body.departments) updates.departments = req.body.departments;

    const employee = await Employee.findOneAndUpdate(
      { employeeID: req.params.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeID: req.params.id });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/average-salary/:department", async (req, res) => {
  try {
    const department = req.params.department;
    const result = await Employee.aggregate([
      { $match: { departments: department } },
      { $group: { _id: null, avgSalary: { $avg: "$salary" } } }
    ]);
    res.json({ department, averageSalary: result[0] ? result[0].avgSalary : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
