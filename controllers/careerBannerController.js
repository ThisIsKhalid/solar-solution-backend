const fs = require("fs");
const CareerBanner = require("../models/careerBannnerModel");

exports.createCareerBanner = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const careerBanner = {
    ...data,
    image,
  };

  try {
    const result = await CareerBanner.create(careerBanner);

    res.status(201).json({
      success: true,
      message: "CareerBanner created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getCareerBanners = async (req, res) => {
  try {
    const result = await CareerBanner.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "CareerBannernot found",
      });
    }

    res.status(200).json({
      success: true,
      message: "CareerBanner fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateCareerBanner = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await CareerBanner.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "CareerBanner not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/careerBanner${isExist.image}`, (err) => {
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

    const result = await CareerBanner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "careerBanner not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "careerBanner updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
