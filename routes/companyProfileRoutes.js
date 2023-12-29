const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateCompanyProfile,
  getCompanyProfiles,
  createCompanyProfile,
} = require("../controllers/companyProfileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/companyProfile");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateCompanyProfile);

router.get("/", getCompanyProfiles);

router.post("/add", upload.single("image"), createCompanyProfile);

module.exports = router;
