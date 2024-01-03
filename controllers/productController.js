const Product = require("../models/productModel");
const slugify = require("slugify");
const fs = require("fs");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");

exports.addProduct = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  if (!image) {
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });
  }

  const slug = slugify(`${data?.title}-${Date.now()}`).toLowerCase();

  const product = {
    ...data,
    image,
    slug,
  };

  try {
    const result = await Product.create(product);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, [
    "category",
    "subCategory",
    "subSubCategory",
  ]);

  const { category, subCategory, subSubCategory } = filters;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const result = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category")
      .populate("subCategory")
      .populate("subSubCategory");

    let products = result;

    if (category) {
      products = products.filter(
        (product) => product?.category?.slug === category
      );
    }

    if (subCategory) {
      products = products.filter(
        (product) => product?.subCategory?.slug === subCategory
      );
    }

    if (subSubCategory) {
      products = products.filter(
        (product) => product?.subSubCategory?.slug === subSubCategory
      );
    }

    const total = products.length;

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Product.findById(id)
      .populate("category")
      .populate("subCategory")
      .populate("subSubCategory");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const result = await Product.findOne({ slug: req?.params?.slug })
      .populate("category")
      .populate("subCategory")
      .populate("subSubCategory");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    fs.unlink(`./uploads/products/${product?.image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const { title, description } = req?.body;
  // console.log(title, description);

  const slug = slugify(`${title}-${Date.now()}`).toLowerCase();

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (image) {
      fs.unlink(`./uploads/products/${product?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
          slug,
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          slug,
        },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
