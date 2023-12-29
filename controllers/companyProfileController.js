const fs = require("fs");
const CompanyProfile = require("../models/companyProfileModel");

exports.createCompanyProfile = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const careerBanner = {
    ...data,
    image,
  };

  try {
    const result = await CompanyProfile.create(careerBanner);

    res.status(201).json({
      success: true,
      message: "CompanyProfile created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getCompanyProfiles = async (req, res) => {
  try {
    const result = await CompanyProfile.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "CompanyProfile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "CompanyProfile fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateCompanyProfile = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await CompanyProfile.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "CompanyProfile not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/companyProfile/${isExist.image}`, (err) => {
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

    const result = await CompanyProfile.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "CompanyProfile not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "CompanyProfile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
