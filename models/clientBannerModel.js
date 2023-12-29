const mongoose = require("mongoose");

const ClientBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const ClientBanner = mongoose.model("ClientBanner", ClientBannerSchema);

module.exports = ClientBanner;
