const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getCareerBanners,
  updateCareerBanner,
  createCareerBanner,
} = require("../controllers/careerBannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/careerBanner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateCareerBanner);

router.get("/", getCareerBanners);

router.post("/add", upload.single("image"), createCareerBanner);

module.exports = router;
