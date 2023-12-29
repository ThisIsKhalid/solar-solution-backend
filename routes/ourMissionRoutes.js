const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateOurMission,
  getOurMissions,
  createOurMission,
} = require("../controllers/ourMissionController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/ourMission");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateOurMission);

router.get("/", getOurMissions);

router.post("/add", upload.single("image"), createOurMission);

module.exports = router;
