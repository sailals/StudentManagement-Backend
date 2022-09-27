const Student = require("../models/student");
const express = require("express");
const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: { verified: { documentverified: true, paymentstatus: false } },
      },
      { new: true }
    );
    res.status(200).send(updatedStudent);
  } catch (err) {
    res.status(402).send(err);
  }
});

module.exports = router;
