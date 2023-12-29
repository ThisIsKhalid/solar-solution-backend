const fs = require("fs");
const Clients = require("../models/clientsModel");

exports.addClient = async (req, res) => {
  try {
    const image = req?.file?.filename;
    const body = req?.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "banner image is required",
      });
    }

    const banner = {
      image: image,
      order: body?.order,
    };

    const result = await Clients.create(banner);

    res.status(200).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.allClients = async (req, res) => {
  try {
    const banners = await Clients.find({}).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: "All banners",
      data: banners,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req?.params;
    const banner = await Clients.findOne({ _id: id });

    if (banner) {
      fs.unlink(`./uploads/clients/${banner.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Clients.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Delete success",
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Banner not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req?.params;
    const image = req?.file?.filename;
    const body = req?.body;

    const isExist = await Clients.findOne({ _id: id });
    if (!isExist) {
      return res.status(400).json({
        success: false,
        error: "Banner not found",
      });
    }

    if (image) {
      const client = {
        image: image,
        order: body?.order,
      };

      fs.unlink(`./uploads/clients/${isExist.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Clients.findByIdAndUpdate(id, client, {
        new: true,
      });
    } else {
      const client = {
        order: body?.order,
        image: isExist?.image,
      };

      await Clients.findByIdAndUpdate(id, client, {
        new: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const { id } = req?.params;
    const banner = await Clients.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: banner,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
