const mongoose = require("mongoose");

const newsCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const NewsCategories = mongoose.model("NewsCategories", newsCategoriesSchema);

module.exports = NewsCategories;
