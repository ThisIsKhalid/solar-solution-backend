const {
  createCareerForm,
  getCareerForms,
  getCareerFormById,
  deleteForm,
} = require("../controllers/careerFormController");

const router = require("express").Router();

router.post("/add", createCareerForm);

router.get("/", getCareerForms);

router.get("/:id", getCareerFormById);

router.delete("/:id", deleteForm);

module.exports = router;
