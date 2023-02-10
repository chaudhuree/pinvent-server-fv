const express = require("express");
const router = express.Router();
const protect = require("../middleWares/auth");
const { createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct

} = require("../controllers/product");
const { upload } = require("../utils/fileUpload");

router.post("/createProduct", protect, upload.single('productImage'), createProduct);
router.patch("/:id", protect, upload.single("productImage"), updateProduct);
router.get("/allProducts", protect, getProducts);
router.get("/product/:id", protect, getProduct);
router.delete("/deleteProduct/:id", protect, deleteProduct);

module.exports = router;
