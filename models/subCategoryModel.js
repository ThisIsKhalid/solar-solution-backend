const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema(
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
  },
  { timestamps: false }
);

const SubCategories = mongoose.model("SubCategories", subCategoriesSchema);

module.exports = SubCategories;
