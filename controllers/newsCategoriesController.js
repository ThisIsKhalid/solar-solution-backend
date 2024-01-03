const fs = require("fs");
const slugify = require("slugify");
const NewsCategories = require("../models/newsCategoryModel");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = {
      ...req?.body,
      slug: slugify(name).toLowerCase(),
    };

    const result = await NewsCategories.create(category);

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
    let categories = await NewsCategories.find({})

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

    const category = await NewsCategories.findOne({ _id: id });

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

    const category = await NewsCategories.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    const slug = slugify(data?.name).toLowerCase();

    const newData = {
      ...data,
      slug,
    };

    const result = await NewsCategories.findByIdAndUpdate(id, newData, {
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

    const category = await NewsCategories.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    await NewsCategories.findByIdAndDelete(id);

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
