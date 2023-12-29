const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
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
  subSubCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
