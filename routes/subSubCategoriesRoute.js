const router = require("express").Router();
const {
  addSubSubCategory,
  deleteSubSubCategory,
  updateSubSubCategory,
  getSubSubCategory,
  getSubSubCategories,
} = require("../controllers/subSubCategoriesController");

router.post("/", addSubSubCategory);
router.get("/", getSubSubCategories);
router.get("/:id", getSubSubCategory);

router.patch("/:id", updateSubSubCategory);
router.delete("/:id", deleteSubSubCategory);

module.exports = router;
