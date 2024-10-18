const categoryModel = require("../category/categoryModel");
const productModel = require("../product/productModel");
const services = require("../product/productServices");
const productRedisServices = require("../product/redisServies");
const categoryRedisServices = require("../category/redisServicesForCategory");
//call from adminpanel to refill data in redis
const fillProductsInRedis = async () => {
  const products = await productModel.findAll();
  await productRedisServices.setProducts(products);
};
const fillCategoriesInRedis = async () => {
  const categories = await categoryModel.findAll();
  await categoryRedisServices.setCategories(categories);
};
fillCategoriesInRedis();
fillProductsInRedis();
