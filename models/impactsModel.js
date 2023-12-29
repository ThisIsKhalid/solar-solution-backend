const mongoose = require("mongoose");

const ImpactsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Impacts = mongoose.model("Impacts", ImpactsSchema);

module.exports = Impacts;
