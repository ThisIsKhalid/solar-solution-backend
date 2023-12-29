const mongoose = require("mongoose");

const CareerBannerSchema = new mongoose.Schema({
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

const CareerBanner = mongoose.model("CareerBanner", CareerBannerSchema);

module.exports = CareerBanner;
