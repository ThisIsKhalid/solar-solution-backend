const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addBanner,
  allBanners,
  deleteBanner,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add-banner", upload.single("image"), addBanner);
router.get("/allBanners", allBanners);
router.delete("/delete/:id", deleteBanner);

module.exports = router;
