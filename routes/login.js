const bcrypt = require("bcrypt");
const joi = require("joi");
const Student = require("../models/student");
const express = require("express");
const generateToken = require("../utility/generateToken");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    email: joi.string().min(3).max(200).required().email(),
    password: joi.string().min(6).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let student = await Student.findOne({ email: req.body.email });

  if (!student) {
    return res.status(400).send("Invalid email or password");
  }

  const isValid = await bcrypt.compare(req.body.password, student.password);

  if (!isValid) {
    return res.status(400).send("Invalid Email or Password");
  }

  const token = generateToken(student);

  res.send(token);
});

module.exports = router;
