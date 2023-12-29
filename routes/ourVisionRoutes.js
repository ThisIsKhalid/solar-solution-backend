const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateOurVision,
  getOurVisions,
  createOurVision,
} = require("../controllers/ourVisionController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/ourVision");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateOurVision);

router.get("/", getOurVisions);

router.post("/add", upload.single("image"), createOurVision);

module.exports = router;
