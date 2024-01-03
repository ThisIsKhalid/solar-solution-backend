const router = require("express").Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProductById,
  updateProduct,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", getAllProducts);

router.get("/:id", getProductById);

router.get("/getbyslug/:slug", getProductBySlug);

router.post("/add-product", upload.single("image"), addProduct);

router.patch("/update-product/:id", upload.single("image"), updateProduct);

router.delete("/delete/:id", deleteProductById);

module.exports = router;
