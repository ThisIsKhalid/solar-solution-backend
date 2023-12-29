const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

router.post("/", addCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
