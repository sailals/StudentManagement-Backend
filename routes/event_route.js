const express = require("express");
const router = express.Router();
const cloudinary = require("../utility/cloudinary");
const Event = require("../models/event");

router.post("/", async (req, res) => {
  const { title, timing, image, desc } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineshop",
      });
      if (uploadRes) {
        const event = new Event({
          title,
          timing,
          desc,
          image: uploadRes,
        });
        const savedEvent = await event.save();

        res.status(200).send(savedEvent);
      }
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Event.find().sort({ _id: -1 }).limit(3);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
