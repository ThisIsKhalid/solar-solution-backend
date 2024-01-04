const {
  addAdministrator,
  adminLogin,
  deleteAdmin,
  getAdmins,
  getLoggedAdmin,
} = require("../controllers/administratorController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/add", verifyToken, addAdministrator);

router.post("/login", adminLogin);

router.delete("/:id", verifyToken, deleteAdmin);

router.get("/all", getAdmins);

router.get("/loggedUser", verifyToken, getLoggedAdmin);

module.exports = router;
