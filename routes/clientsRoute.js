const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addClient,
  allClients,
  deleteClient,
  getClientById,
  updateClient,
} = require("../controllers/clientsController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/clients");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addClient);
router.get("/", allClients);
router.delete("/delete/:id", deleteClient);

router.get("/:id", getClientById);
router.patch("/:id", upload.single("image"), updateClient);

module.exports = router;
