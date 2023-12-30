const fs = require("fs");
const ClientBanner = require("../models/clientBannerModel");

exports.addClientBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "banner image is required",
      });
    }

    const banner = {
      image: image,
    };

    const result = await ClientBanner.create(banner);

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

exports.allClientBanners = async (req, res) => {
  try {
    const banners = await ClientBanner.find({});

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

exports.updateClientBanner = async (req, res) => {
  const { id } = req?.params;
  const image = req?.file?.filename;

  if (!image) {
    return res.status(400).json({
      success: false,
      error: "banner image is required",
    });
  }

  try {
    const banner = await ClientBanner.findOne({ _id: id });

    if (image && banner) {
      const data = {
        image: image,
      };

      fs.unlink(`./uploads/clientBanner/${banner.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await ClientBanner.findByIdAndUpdate(id, data, { new: true });

      res.status(200).json({
        success: true,
        message: "UPdate success",
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
