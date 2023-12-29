const CareerForm = require("../models/careerForm");

exports.createCareerForm = async (req, res) => {
  try {
    const newCareerForm = await CareerForm.create(req?.body);

    res.status(201).json({
      success: true,
      message: "Career form created successfully",
      data: newCareerForm,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCareerForms = async (req, res) => {
  try {
    const careerForms = await CareerForm.find();

    res.status(200).json({
      success: true,
      message: "Career forms fetched successfully",
      data: careerForms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCareerFormById = async (req, res) => {
  const id = req.params?.id;

  try {
    const careerForm = await CareerForm.findById(id);

    res.status(200).json({
      success: true,
      message: "Career form fetched successfully",
      data: careerForm,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteForm = async (req, res) => {
  const id = req.params?.id;

  try {
    await CareerForm.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Career form deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
