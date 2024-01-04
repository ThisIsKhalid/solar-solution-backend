const {
  getContacts,
  addContact,
  updateContact,
} = require("../controllers/contactController");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/contactus";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

router.get("/", getContacts);

router.patch(
  "/update-contact/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateContact
);

router.post(
  "/add-contact",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  addContact
);

module.exports = router;
