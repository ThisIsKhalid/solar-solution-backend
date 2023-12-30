const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addClientBanner,
  allClientBanners,
  updateClientBanner,
} = require("../controllers/clientBannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/clientBanner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addClientBanner);
router.get("/", allClientBanners);
router.patch("/update/:id", updateClientBanner);

module.exports = router;
