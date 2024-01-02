const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateOurTeam,
  getOurTeams,
  createOurTeam,
  getOurTeamById,
  deleteOurTeam,
} = require("../controllers/ourTeamController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/ourTeam");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.patch("/update/:id", upload.single("image"), updateOurTeam);

router.get("/", getOurTeams);

router.get("/:id", getOurTeamById);

router.post("/add", upload.single("image"), createOurTeam);

router.delete("/delete/:id", deleteOurTeam);

module.exports = router;
