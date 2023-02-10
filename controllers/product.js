const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

//docs: Create Product 
const createProduct = asyncHandler(async (req, res) => {

  //  res.status(200).json({message:"Create product success"})
  const { name, sku, category, quantity, price, description } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  // imp:when image is uploaded we get this req.file object in the controller 

  let fileData = {};
  if (req.file) {

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Create Product
  const product = await Product.create({
    // user: req.user._id,
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product); // 201: created 

});

// docs: Get all Products uploaded by a user 
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).populate("user","name").sort("-createdAt");
  res.status(200).json(products);
});

//  docs: Get single product 
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) { //from product model we can found user is the id field
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

//  docs: Delete Product 
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

//  docs: Update Product 
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }


  // Handle Image upload (if image is uploaded again then this field will fill otherwise it will be empty)
  let fileData = {};
  if (req.file) {

    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      // if no file is send then the fileData field will be empty. so all the key is empty and the length will be 0. so we will use the previous image
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});




module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};