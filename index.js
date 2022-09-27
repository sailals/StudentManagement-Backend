// Imports-->
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const stripeCheckOut = require("./routes/stripe");
const studentUpdate = require("./routes/student_route");
const documentVerification = require("./routes/documentVerification");
const EventRoute = require("./routes/event_route");
const TestimonialRoute = require("./routes/testimonial_route");

// Use-->
const app = express();
app.use(express.json({ limit: "25mb" }));
dotenv.config();
app.use(cors());

// Demo route-->

app.get("/", (req, res) => {
  res.status(200).send("Hello From Server Test");
});

// Mongoose Connection -->
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Mongo DB successfully"))
  .catch((err) => console.log(err));

// Routes -->

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/stripe", stripeCheckOut);
app.use("/api/studentUpdate", studentUpdate);
app.use("/api/docverification", documentVerification);
app.use("/api/events", EventRoute);
app.use("/api/testimonial", TestimonialRoute);

// Listen-->

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started at Port 5000");
});
