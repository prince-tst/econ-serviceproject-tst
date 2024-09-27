const  categoryModel  = require("./categoryModel");

// Service to add a new category
const addCategory = async (categoryData) => {
  const addedCategory = await categoryModel.create(categoryData);
  return addedCategory;
};

// Service to get all categories
const getCategories = async () => {
  const categories = await categoryModel.findAll();
  return categories;
};

// Service to update a category
const updateCategory = async (categoryId, categoryData) => {
  const category = await categoryModel.findByPk(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  // Update category with new data
  await category.update(categoryData);

  return category;
};

// Service to delete a category
const deleteCategory = async (categoryId) => {
  const category = await categoryModel.findByPk(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  await category.destroy();
  return { message: "Category deleted successfully" };
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
