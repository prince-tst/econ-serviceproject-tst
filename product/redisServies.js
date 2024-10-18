const redisClient = require("../config/redisClient");
const { productSchema } = require("../utils/redisSchemas");

// Redis-related services
exports.setProducts = async (products) => {
  const prefix = productSchema.prefix; // e.g., "product:"
  return Promise.all(
    products.map(async (product) => {
      let data = this.formatDataForRedis(product);
      // Store each product under a unique key based on its id
      console.log(data);
      return await redisClient.json.set(`${prefix}${product.id}`, "$", data);
    })
  );
};
exports.setSingleProduct = async (product) => {
  try {
    const prefix = productSchema.prefix; // e.g., "product:"

    const data = this.formatDataForRedis(product);
    await redisClient.json.set(`${prefix}${product.id}`, "$", data);
    console.log(`Product ${product.id} stored in Redis.`);

    return true;
  } catch (error) {
    console.error(`Failed to store product ${product.id} in Redis:`, error);
    throw new Error("Redis store error");
  }
};
exports.removeSingleProduct = async (productId) => {
  try {
    const prefix = productSchema.prefix;
    const result = await redisClient.del(`${prefix}${productId}`);
    if (result === 1) {
      console.log(`Product ${productId} successfully removed from Redis.`);
      return true;
    } else {
      console.log(`Product ${productId} not found in Redis.`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to remove product ${productId} from Redis:`, error);
    throw new Error("Redis remove error");
  }
};
exports.getProduct = async (productId) => {
  try {
    const prefix = productSchema.prefix;

    // Retrieve the product using its unique key
    const product = await redisClient.json.get(`${prefix}${productId}`, "$");

    if (!product) {
      console.log(`Product ${productId} not found in Redis.`);
      return null;
    }

    return product;
  } catch (error) {
    console.error(`Failed to retrieve product ${productId} from Redis:`, error);
    throw new Error("Redis fetch error");
  }
};
exports.formatDataForRedis = (product) => {
  if (!product) return;
  const formatedData = {
    id: product.id,
    name: product.productName,
    categoryId: product.categoryId,
    fulldata: product,
  };
  return formatedData;
};
