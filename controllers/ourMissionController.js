const fs = require("fs");
const OurMission = require("../models/ourMissionModel");

exports.createOurMission = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const careerBanner = {
    ...data,
    image,
  };

  try {
    const result = await OurMission.create(careerBanner);

    res.status(201).json({
      success: true,
      message: "OurMission created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getOurMissions = async (req, res) => {
  try {
    const result = await OurMission.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurMission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurMission fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateOurMission = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await OurMission.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "OurMission not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/ourMission/${isExist.image}`, (err) => {
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

    const result = await OurMission.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "OurMission not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "OurMission updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
