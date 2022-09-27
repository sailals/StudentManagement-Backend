const jwt = require("jsonwebtoken");

const generateToken = (student) => {
  const secretkey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: student._id,
      firstname: student.generalinfo.firstname,
      email: student.email,
      isAdmin: student.isAdmin,
      isVerified: student.verified,
      image: student.image,
    },
    secretkey
  );
  return token;
};

module.exports = generateToken;
