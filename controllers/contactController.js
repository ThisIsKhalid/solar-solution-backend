const Contact = require("../models/contactModel");
const fs = require("fs");

exports.updateContact = async (req, res) => {
  const id = req?.params?.id;
  const banner = req?.files?.banner?.[0]?.filename;
  const image = req?.files?.image?.[0]?.filename;
  const data = req?.body;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: "contact not found",
      });
    }

    let newData;

    if (image && banner) {

      newData = {
        ...data,
        image: image,
        banner: banner,
      };

      fs.unlink(`./uploads/contactus/${contact?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      fs.unlink(`./uploads/contactus/${contact?.banner}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      
    } else if (image) {
      fs.unlink(`./uploads/contactus/${contact.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      newData = {
        ...data,
        image,
        banner: contact.banner,
      };
    } else if (banner) {
      fs.unlink(`./uploads/contactus/${contact.banner}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      newData = {
        ...data,
        banner,
        image: contact.image,
      };
    } else {
      newData = {
        ...data,
        banner: contact.banner,
        image: contact.image,
      };
    }

    await Contact.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});

    res.status(200).json({
      success: true,
      message: "All contacts",
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addContact = async (req, res) => {
  const banner = req?.files?.banner?.[0]?.filename;
  const image = req?.files?.image?.[0]?.filename;

  if (!image || !banner) {
    return res.status(400).json({
      success: false,
      error: "Image or Icon is missing",
    });
  }

  try {
    const data = {
      ...req.body,
      banner: banner,
      image: image,
    };

    const result = await Contact.create(data);

    res.status(200).json({
      success: true,
      message: "Contact created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
