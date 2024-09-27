const productModel = require("./productModel");

// Service to add a new product
const addProductService = async (productData) => {
  const addedProduct = await productModel.create(productData);
  return addedProduct;
};

// Service to get all products
const getProductsService = async () => {
  const products = await productModel.findAll();
  return products;
};

// Service to update a product
const updateProductService = async (productId, productData) => {
  const product = await productModel.findByPk(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // Update product with new data
  await product.update(productData);

  return product;
};

// Service to delete a product
const deleteProductService = async (productId) => {
  const product = await productModel.findByPk(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  await product.destroy();
  return { message: "Product deleted successfully" };
};

module.exports = {
  addProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
};
