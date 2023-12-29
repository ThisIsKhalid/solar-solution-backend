const fs = require("fs");
const NewsEvent = require("../models/newsEventModel");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");

exports.createNewsEvent = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const newData = {
    ...data,
    image,
  };

  try {
    const result = await NewsEvent.create(newData);

    res.status(201).json({
      success: true,
      message: "NewsEvent created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getNewsEvents = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);
  const filters = pick(req.query, ["category"]);

  const { category } = filters;
  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const andCondition = [];

    if (category) {
      andCondition.push({ category: category });
    }

    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};

    const result = await NewsEvent.find(whereCondition).skip(skip).limit(limit);

    const total = await NewsEvent.countDocuments(whereCondition);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "NewsEvent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NewsEvents fetched successfully",
      data: result,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateNewsEvent = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await NewsEvent.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "NewsEvent not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/newsEvent${isExist.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image,
      };
    } else {
      newData = { ...data };
    }

    const result = await NewsEvent.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "NewsEvent not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "NewsEvent updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getNewsEventById = async (req, red) => {
  const id = req?.params?.id;

  try {
    const result = await NewsEvent.findById(id);

    res.status(200).json({
      success: true,
      message: "NewsEvent fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteNewsEventById = async (req, red) => {
  const id = req?.params?.id;

  try {
    const isExist = await NewsEvent.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "NewsEvent not found",
      });
    }

    fs.unlink(`./uploads/newsEvent${isExist.image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    await NewsEvent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "NewsEvent deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
