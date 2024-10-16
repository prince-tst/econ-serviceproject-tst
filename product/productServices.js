const productModel = require("./productModel");
const redisClient = require("../config/redisClient");
// Service to add a new product
const addProductService = async (productData) => {
  const addedProduct = await productModel.create(productData);
  return addedProduct;
};

// Service to get all products
const getProductsService = async () => {
  const cacheKey = `products`; // Single key for all products
  try {
    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      console.log("Cache hit");
      return JSON.parse(cachedProducts);
    }
    console.log("Cache miss");
    const products = await productModel.findAll();

    if (products) {
      await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600); // Cache for 1 hour
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
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
