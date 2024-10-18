const Model = require("./productModel");
const redisClient = require("../config/redisClient");
const { productSchema } = require("../utils/redisSchemas");
const redisSchema = require("../utils/redisSchemas");
const redisService = require("./redisServies");
const productModel = require("./productModel");
// Service to add a new product
const addProductService = async (productData) => {
  const addedProduct = await Model.create(productData);
  await redisService.setSingleProduct(addedProduct);
  return addedProduct;
};
// Service to get all products
const getProductsService = async () => {
  try {
    //find datafrom redis
    const products = await productModel.findAll();
    await redisService.setProducts(products);
    console.log("Data fetched from DB and stored in Redis.");
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

// Service to update a product
const updateProductService = async (productId, productData) => {
  const product = await Model.findByPk(productId);
  //await redisService.removeSingleProduct(product.id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Update product with new data
  await product.update(productData);
  await redisService.setSingleProduct(product);
  return product;
};

// Service to delete a product
const deleteProductService = async (productId) => {
  const product = await Model.findByPk(productId);

  if (!product) {
    throw new Error("Product not found");
  }
  await redisService.removeSingleProduct(productId);

  await product.destroy();
  return { message: "Product deleted successfully" };
};
// redisService to create indexs
const createOrSearchIndexRedis = async () => {
  return Promise.all(
    Object.values(redisSchema).map(async ({ index, schema, prefix }) => {
      return redisClient.ft
        .create(index, schema, {
          ON: "JSON",
          PREFIX: prefix,
        })
        .then(() => {
          console.log(
            `RedisSearch -> RedisSearch index '${index}' created successfully`
          );
          return `Index '${index}' created successfully`;
        })
        .catch((error) => {
          if (error.message === "Index already exists") {
            console.log(
              `RedisSearch -> Index '${index}' exists already, skipped creation.`
            );
            return `Index '${index}' already exists`;
          } else {
            console.error(
              "RedisSearch -> Error creating RedisSearch index:",
              error
            );
            throw new Error(
              `Error creating index '${index}': ${error.message}`
            );
          }
        });
    })
  );
};

// Proper exports using module.exports
module.exports = {
  addProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
  createOrSearchIndexRedis,
};
