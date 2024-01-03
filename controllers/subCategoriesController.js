const fs = require("fs");
const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const Categories = require("../models/categoriesModel");
const SubSubCategory = require("../models/subSubCategoryModel");

exports.addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const sub_category = {
      name,
      category: categoryId,
      slug: slugify(`${name}-${Date.now()}`).toLowerCase(),
    };

    const result = await SubCategory.create(sub_category);
    await Categories.updateOne(
      { _id: categoryId },
      { $push: { subCategories: result?._id } }
    );

    res.status(200).json({
      success: true,
      message: "Sub Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const category = await SubCategory.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        error: "Sub Category not found",
      });
    }

    const slug = slugify(`${name}-${Date.now()}`).toLowerCase();

    await SubCategory.updateOne(
      { _id: id },
      {
        name: name,
        slug: slug,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sub Category updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { categoryId } = req?.body;

    const subCategory = await SubCategory.findById(id);
    if (!subCategory) {
      res.status(404).json({
        success: false,
        error: "Sub Category not found",
      });
    }

    await SubCategory.deleteOne({ _id: id });
    await Categories.updateOne(
      { _id: categoryId },
      { $pull: { subCategories: id } }
    );

    if (subCategory?.subSubCategories?.length > 0) {
      await SubSubCategory.deleteMany({
        _id: { $in: subCategory.subSubCategories },
      });
    }

    res.status(200).json({
      success: true,
      message: "Sub Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    let subCategories = await SubCategory.find({}, "name slug").populate(
      "category",
      "name"
    );

    res.status(200).json({
      success: true,
      message: "Sub Category get success",
      data: subCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findOne({ _id: id })
      .populate("category")
      .populate("subSubCategories");

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
