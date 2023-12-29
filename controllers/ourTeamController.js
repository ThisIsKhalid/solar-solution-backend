const fs = require("fs");
const OurTeam = require("../models/careerBannnerModel");

exports.createOurTeam = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const careerBanner = {
    ...data,
    image,
  };

  try {
    const result = await OurTeam.create(careerBanner);

    res.status(201).json({
      success: true,
      message: "OurTeam created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getOurTeams = async (req, res) => {
  try {
    const result = await OurTeam.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurTeam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurTeam fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateOurTeam = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await OurTeam.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "OurTeam not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/ourTeam${isExist.image}`, (err) => {
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

    const result = await OurTeam.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurTeam not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurTeam updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
