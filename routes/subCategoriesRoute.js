const router = require("express").Router();
const {
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getSubCategory,
  getSubCategories,
} = require("../controllers/subCategoriesController");

router.post("/", addSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getSubCategory);

router.patch("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;
