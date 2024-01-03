const fs = require("fs");
const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const SubCategory = require("../models/subCategoryModel");
const SubSubCategory = require("../models/subSubCategoryModel");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = {
      ...req?.body,
      slug: slugify(name).toLowerCase(),
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
    let categories = await Categories.find({})
      .sort({ order: 1 })
      .populate({
        path: "subCategories",
        populate: {
          path: "subSubCategories",
          select: "name slug category subCategory",
        },
        select: "name slug category",
      });

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

    const category = await Categories.findOne({ _id: id }).populate(
      "subCategories",
      "name slug"
    );

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

    const slug = slugify(data?.name).toLowerCase();

    const newData = {
      ...data,
      slug,
    };

    const result = await Categories.findByIdAndUpdate(id, newData, {
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

    if (category?.subCategories?.length > 0) {
      const subCategory = await SubCategory.find({
        _id: { $in: category?.subCategories },
      });

      const subSubCategoryIds = subCategory.reduce((acc, subCategory) => {
        acc.push(
          ...subCategory.subSubCategories.map(
            (subSubCategory) => subSubCategory._id
          )
        );
        return acc;
      }, []);
      await SubSubCategory.deleteMany({ _id: { $in: subSubCategoryIds } });
    }

    if (category?.subCategories?.length > 0) {
      await SubCategory.deleteMany({
        _id: { $in: category.subCategories },
      });
    }


    await Categories.deleteOne({ _id: id });

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
