const mongoose = require("mongoose");

const OurTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const OurTeam = mongoose.model("OurTeam", OurTeamSchema);

module.exports = OurTeam;
