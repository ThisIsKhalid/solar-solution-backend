const mongoose = require("mongoose");

const careerFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CareerForm = mongoose.model("CareerForm", careerFormSchema);

module.exports = CareerForm;
