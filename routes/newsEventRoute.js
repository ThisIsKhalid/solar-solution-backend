const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateNewsEvent,
  getNewsEvents,
  getNewsEventById,
  createNewsEvent,
  deleteNewsEventById,
} = require("../controllers/newsEventController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/newsEvent");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateNewsEvent);

router.get("/", getNewsEvents);

router.get("/:id", getNewsEventById);

router.post("/add", upload.single("image"), createNewsEvent);

router.delete("/delete/:id", deleteNewsEventById);

module.exports = router;
