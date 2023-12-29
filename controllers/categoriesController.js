const fs = require("fs");
const slugify = require("slugify");
const Categories = require("../models/categoriesModel");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = {
      ...req?.body,
      slug: slugify(name),
    };

    const result = await Categories.create(category);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.find({}).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const category = await Categories.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    const result = await Categories.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const category = await Categories.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    await Categories.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
