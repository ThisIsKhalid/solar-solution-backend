const fs = require("fs");
const OurVision = require("../models/ourVisionModel");

exports.createOurVision = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const careerBanner = {
    ...data,
    image,
  };

  try {
    const result = await OurVision.create(careerBanner);

    res.status(201).json({
      success: true,
      message: "OurVision created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getOurVisions = async (req, res) => {
  try {
    const result = await OurVision.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurVision not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurVision fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateOurVision = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await OurVision.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "OurVision not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/ourVision/${isExist.image}`, (err) => {
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

    const result = await OurVision.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurVision not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurVision updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
