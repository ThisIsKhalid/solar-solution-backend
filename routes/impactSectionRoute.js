const {
  addImpactSection,
  getImpactSections,
  updateImpactSection,
} = require("../controllers/ImpactSectionController");

const router = require("express").Router();

router.post("/add", addImpactSection);

router.get("/", getImpactSections);

router.patch("/update/:id", updateImpactSection);

module.exports = router;
