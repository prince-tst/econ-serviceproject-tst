const redisServicesForCategory = require("./redisServicesForCategory");
const categoryModel = require("./categoryModel");

// Service to add a new category
const addCategory = async (categoryData) => {
  const addedCategory = await categoryModel.create(categoryData);
  await redisServicesForCategory.setSingleCategory(addedCategory);
  return addedCategory;
};

// Service to get all categories
const getCategories = async () => {
  const categories = await categoryModel.findAll();
  //await redisServicesForCategory.setCategories(categories);
  return categories;
};

// Service to update a category
const updateCategory = async (categoryId, categoryData) => {
  const category = await categoryModel.findByPk(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  redisServicesForCategory.removeSingleCategory(categoryId);
  // Update category with new data
  await category.update(categoryData);
  await redisServicesForCategory.setSingleCategory(category);
  return category;
};

// Service to delete a category
const deleteCategory = async (categoryId) => {
  const category = await categoryModel.findByPk(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }
  redisServicesForCategory.removeSingleCategory(categoryId);
  await category.destroy();
  return { message: "Category deleted successfully" };
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
