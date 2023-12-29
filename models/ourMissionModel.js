const mongoose = require("mongoose");

const OurMissionSchema = new mongoose.Schema({
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

const OurMission = mongoose.model("OurMission", OurMissionSchema);

module.exports = OurMission;
