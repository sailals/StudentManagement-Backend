// Imports--->
const bcrypt = require("bcrypt");
const express = require("express");
const joi = require("joi");
const Student = require("../models/student");
const generateToken = require("../utility/generateToken");
const cloudinary = require("../utility/cloudinary");

// Router -->
const router = express.Router();

// Demo Test-->
router.get("/", (req, res) => {
  res.status(200).send("Hello From Router Test");
});

// Post -->
router.post("/", async (req, res) => {
  try {
    const schema = joi.object({
      generalinfo: {
        firstname: joi.string().min(3).max(30).required(),
        lastname: joi.string().min(3).max(30).required(),
        mothersname: joi.string().min(3).max(30).required(),
        fathersname: joi.string().min(3).max(30).required(),
        lcollege: joi.string().min(3).max(70).required(),
        dob: joi.string().min(3).max(30).required(),
      },

      studentaddress: {
        street: joi.string().min(3).max(500),
        address: joi.string().min(3).max(500),
        pincode: joi.number().required(),
        place: joi.string().min(3).max(30).required(),
        country: joi.string().min(3).max(30).required(),
        stdcode: joi.number().required(),
        phone: joi.number().required(),
        mobile: joi.number().required(),
      },
      sscdetails: {
        rollno: joi.number().required(),
        board: joi.string().required(),
        school: joi.string().required(),
        passingYear: joi.number().required(),
        percentageMarks: joi.number().required(),
      },
      hscdetails: {
        rollno: joi.number().required(),
        board: joi.string().required(),
        collegeName: joi.string().required(),
        passingYear: joi.number().required(),
        percentageMarks: joi.number().required(),
      },

      email: joi.string().min(3).max(200).email().required(),
      password: joi.string().min(3).max(1024).required(),
      image: joi.required(),
      pdfImage: joi.required(),
      pdfImageHsc: joi.required(),

      verified: {
        documentverified: joi.boolean().default(false),
        paymentstatus: joi.boolean().default(false),
      },
      isAdmin: joi.boolean().default(false),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let student = await Student.findOne({ email: req.body.email });

    if (student) {
      return res.status(400).send("Student Already Exsist");
    }

    // For the Profie Pic Image Upload To Cloudinary
    const image = req.body.image;

    const uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: "onlineShop",
    });

    // For the PDF Upload to Cloudinary

    const pdfImg = req.body.pdfImage;

    const uploadPdfImage = await cloudinary.uploader.upload(pdfImg, {
      upload_preset: "onlineShop",
    });

    const pdfImgHsc = req.body.pdfImageHsc;

    const uploadPdfImageHsc = await cloudinary.uploader.upload(pdfImgHsc, {
      upload_preset: "onlineShop",
    });

    // console.log(uploadRes);
    console.log(uploadPdfImage);

    student = new Student({
      generalinfo: {
        firstname: req.body.generalinfo.firstname,
        lastname: req.body.generalinfo.lastname,
        mothersname: req.body.generalinfo.mothersname,
        fathersname: req.body.generalinfo.fathersname,
        lcollege: req.body.generalinfo.lcollege,
        dob: req.body.generalinfo.dob,
      },
      studentaddress: {
        street: req.body.studentaddress.street,
        address: req.body.studentaddress.address,
        pincode: req.body.studentaddress.pincode,
        place: req.body.studentaddress.place,
        country: req.body.studentaddress.country,
        stdcode: req.body.studentaddress.stdcode,
        phone: req.body.studentaddress.phone,
        mobile: req.body.studentaddress.mobile,
      },
      sscdetails: {
        rollno: req.body.sscdetails.rollno,
        board: req.body.sscdetails.board,
        school: req.body.sscdetails.school,
        passingYear: req.body.sscdetails.passingYear,
        percentageMarks: req.body.sscdetails.percentageMarks,
      },
      hscdetails: {
        rollno: req.body.hscdetails.rollno,
        board: req.body.hscdetails.board,
        collegeName: req.body.hscdetails.collegeName,
        passingYear: req.body.hscdetails.passingYear,
        percentageMarks: req.body.hscdetails.percentageMarks,
      },
      email: req.body.email,
      password: req.body.password,
      verified: req.body.verified,
      isAdmin: req.body.isAdmin,
      image: uploadRes,
      pdfImage: uploadPdfImage,
      pdfImageHsc: uploadPdfImageHsc,
    });
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);

    await student.save();

    const token = generateToken(student);

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
