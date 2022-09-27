const Student = require("../models/student");
const express = require("express");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: { verified: { documentverified: true, paymentstatus: true } },
      },
      { new: true }
    );
    res.status(200).send(updatedStudent);
  } catch (err) {
    res.status(402).send(err);
  }
});

// Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get a Single student

router.get("/find/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (err) {
    console.log(err);
    res.status(500).send(error);
  }
});

// Get total no of Student Count

router.get("/studentcount", async (req, res) => {
  try {
    const student = await Student.find().count();
    res.status(200).json(`${student}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Calculate Payment

router.get("/studentpayment", async (req, res) => {
  try {
    const student = await Student.find({
      "verified.paymentstatus": true,
    }).count();
    const amount = student * 500;
    res.status(200).json(`${amount}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//Recently Added Students
router.get("/recentstudents", async (req, res) => {
  try {
    const student = await Student.find().sort({ _id: -1 }).limit(4);
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Count No Of Students whose documents not verified

router.get("/countdocverified", async (req, res) => {
  try {
    const student = await Student.find({
      "verified.documentverified": false,
    }).count();
    res.status(200).json(`${student}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
// Count No Of Students whose payments done

router.get("/countpaydone", async (req, res) => {
  try {
    const student = await Student.find({
      "verified.paymentstatus": false,
    }).count();
    res.status(200).json(`${student}`);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

// Delete a Student

router.delete("/:id", async (req, res) => {
  try {
    const response = await Student.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(200).send(error);
    console.log(error);
  }
});

module.exports = router;
