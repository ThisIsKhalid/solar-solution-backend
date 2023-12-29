const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mapLink: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    primaryPhone: {
      type: String,
      required: true,
    },
    secondaryPhone: {
      type: String,
    },
    fax: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
