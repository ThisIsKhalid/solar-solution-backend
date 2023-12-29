const Impacts = require("../models/ImpactsModel");

exports.addImpact = async (req, res) => {
  try {
    const data = req.body;

    const impact = await Impacts.create(data);

    res.status(200).json({
      success: true,
      message: "Impact created successfully",
      data: impact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getImpacts = async (req, res) => {
  try {
    const impacts = await Impacts.find();

    res.status(200).json({
      success: true,
      message: "All Impacts fetched successfully",
      data: impacts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateImpact = async (req, res) => {
  const id = req.params?.id;
  const data = req.body;

  try {
    const oldImpact = await Impacts.findById(id);

    if (!oldImpact) {
      return res.status(404).json({
        success: false,
        error: "Impact not found",
      });
    }

    await Impacts.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "Impact updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteImpact = async (req, res) => {
  const id = req.params?.id;

  try {
    const oldImpact = await Impacts.findById(id);

    if (!oldImpact) {
      return res.status(404).json({
        success: false,
        error: "Impact not found",
      });
    }

    await Impacts.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Impact deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getImpactById = async (req, res) => {
  const id = req.params?.id;

  try {
    const impact = await Impacts.findById(id);

    if (!impact) {
      return res.status(404).json({
        success: false,
        error: "Impact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Impact fetched successfully",
      data: impact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
