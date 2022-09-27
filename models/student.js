const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema(
  {
    generalinfo: {
      firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      mothersname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      fathersname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      lcollege: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 70,
      },
      dob: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
    },

    studentaddress: {
      street: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
      },
      address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500,
      },
      pincode: {
        type: Number,
        required: true,
      },
      place: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      stdcode: {
        type: Number,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
    },
    // Changes 2/8/2022
    sscdetails: {
      rollno: {
        type: Number,
        required: true,
      },
      board: {
        type: String,
        required: true,
      },
      school: {
        type: String,
        required: true,
      },
      passingYear: {
        type: Number,
        required: true,
      },
      percentageMarks: {
        type: Number,
        required: true,
      },
    },
    hscdetails: {
      rollno: {
        type: Number,
        required: true,
      },
      board: {
        type: String,
        required: true,
      },
      collegeName: {
        type: String,
        required: true,
      },
      passingYear: {
        type: Number,
        required: true,
      },
      percentageMarks: {
        type: Number,
        required: true,
      },
    },

    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    verified: {
      documentverified: {
        type: Boolean,
        default: false,
      },
      paymentstatus: {
        type: Boolean,
        default: false,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Object,
      required: true,
    },
    pdfImage: {
      type: Object,
      required: true,
    },
    pdfImageHsc: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentsSchema);
