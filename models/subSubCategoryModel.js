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
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: false }
);

const SubSubCategory = mongoose.model("SubSubCategory", subSubCategoriesSchema);

module.exports = SubSubCategory;
