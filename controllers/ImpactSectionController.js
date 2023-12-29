const ImpactSection = require("../models/ImpactSectionModel");

exports.addImpactSection = async (req, res) => {
  try {
    const data = req.body;

    const impactSection = await ImpactSection.create(data);

    res.status(200).json({
      success: true,
      message: "Impact Section created successfully",
      data: impactSection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getImpactSections = async (req, res) => {
  try {
    const impactSections = await ImpactSection.find();

    res.status(200).json({
      success: true,
      message: "All Impact Sections fetched successfully",
      data: impactSections,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateImpactSection = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req.body;

    const impactSection = await ImpactSection.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Impact Section updated successfully",
      data: impactSection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
