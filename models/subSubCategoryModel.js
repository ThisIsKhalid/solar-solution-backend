const mongoose = require("mongoose");

const subSubCategoriesSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const SubSubCategories = mongoose.model(
  "SubSubCategories",
  subSubCategoriesSchema
);

module.exports = SubSubCategories;
