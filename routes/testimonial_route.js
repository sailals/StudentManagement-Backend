const express = require("express");
const router = express.Router();
const Testimonial = require("../models/testimonial");

router.post("/", async (req, res) => {
  const { name, image, desc } = req.body;

  try {
    const testi = new Testimonial({
      name,
      image,
      desc,
    });
    const savedTestimonial = await testi.save();

    res.status(200).send(savedTestimonial);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Testimonial.find().sort({ _id: -1 }).limit(4);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
