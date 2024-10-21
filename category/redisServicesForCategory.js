const redisClient = require("../config/redisClient");
const { categorySchema } = require("../utils/redisSchemas");
exports.setCategories = async (categories) => {
  const prefix = categorySchema.prefix; // Define a prefix for category keys

  return Promise.all(
    categories.map(async (category) => {
      const data = await this.formatDataForRedis(category);
      return await redisClient.json.set(`${prefix}${category.id}`, "$", data);
    })
  );
};
exports.setSingleCategory = async (category) => {
  const prefix = categorySchema.prefix; // Define a prefix for category keys

  const data = await this.formatDataForRedis(category);

  await redisClient.json.set(`${prefix}${category.id}`, "$", data);
  console.log(`Category ${category.id} stored in Redis.`);
};
exports.removeSingleCategory = async (categoryId) => {
  const prefix = categorySchema.prefix; // Define a prefix for category keys

  const result = await redisClient.del(`${prefix}${categoryId}`);

  if (result === 1) {
    console.log(`Category ${categoryId} successfully removed from Redis.`);
    return true; // Category was removed
  } else {
    console.log(`Category ${categoryId} not found in Redis.`);
    return false; // Category was not found
  }
};
exports.getCategory = async (categoryId) => {
  const prefix = categorySchema.prefix; // Define a prefix for category keys

  const category = await redisClient.json.get(`${prefix}${categoryId}`, "$");

  if (!category) {
    console.log(`Category ${categoryId} not found in Redis.`);
    return null; // Handle not found scenario
  }

  return category; // Return the found category
};
exports.getCategories = async () => {
  const index = categorySchema.index; // Define a prefix for category keys

  const categorys = await redisClient.ft.search(index, "*");

  const fullDataOnly = categorys.documents.map((doc) => doc.value.fulldata);

  return fullDataOnly; // Return the found category
};
exports.formatDataForRedis = (category) => {
  if (!category) return;
  const formatedData = {
    id: category.id,
    name: category.categoryName,
    fulldata: category,
  };
  return formatedData;
};
