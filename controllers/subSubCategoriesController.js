const fs = require("fs");
const slugify = require("slugify");
const SubSubCategory = require("../models/subSubCategoryModel");
const SubCategory = require("../models/subCategoryModel");

exports.addSubSubCategory = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;

    const sub_subCategory = {
      name,
      slug: slugify(`${name}-${Date.now()}`).toLowerCase(),
      category: categoryId,
      subCategory: subCategoryId,
    };

    const result = await SubSubCategory.create(sub_subCategory);
    await SubCategory.updateOne(
      { _id: subCategoryId },
      { $push: { subSubCategories: result?._id } }
    );

    res.status(200).json({
      success: true,
      message: "Sub SubCategory created success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubSubCategories = async (req, res) => {
  try {
    let subSubCategories = await SubSubCategory.find({}).populate(
      "category subCategory",
      "name slug"
    );

    res.status(200).json({
      success: true,
      message: "Sub Sub Category get success",
      data: subSubCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSubSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subSubCategory = await SubSubCategory.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Sub sub Category found successfully",
      data: subSubCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { name } = req?.body;

    const category = await SubSubCategory.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        error: "Sub Sub Category not found",
      });
    }

    const slug = slugify(`${name}-${Date.now()}`).toLowerCase();

    await SubSubCategory.updateOne({ _id: id }, { name: name, slug: slug });

    res.status(200).json({
      success: true,
      message: "Sub Sub Category updated success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteSubSubCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const { subCategoryId } = req?.body;
    const subSubCategory = await SubSubCategory.findById(id);

    if (!subSubCategory) {
      return res.status(400).json({
        success: false,
        error: "Sub SubCategory not found!",
      });
    }

    await SubSubCategory.deleteOne({ _id: id });
    await SubCategory.updateOne(
      { _id: subCategoryId },
      { $pull: { subSubCategories: id } }
    );

    res.status(200).json({
      success: true,
      message: "Sub SubCategory delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
