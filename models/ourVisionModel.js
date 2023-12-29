const mongoose = require("mongoose");

const OurVisionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const OurVision = mongoose.model("OurVision", OurVisionSchema);

module.exports = OurVision;
