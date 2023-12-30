const {
  addImpact,
  getImpacts,
  updateImpact,
  deleteImpact,
  getImpactById,
} = require("../controllers/impactsController");

const router = require("express").Router();

router.post("/add-impact", addImpact);

router.get("/", getImpacts);

router.patch("/update-impact/:id", updateImpact);

router.delete("/delete-impact/:id", deleteImpact);

router.get("/:id", getImpactById);

module.exports = router;
