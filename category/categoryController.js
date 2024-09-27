const categoryServices = require("./categoryServices");

const addCategory = async (req, res, next) => {
  try {
    const categoryData = {
      categoryName: req.body.categoryName,
    };

    // Call the service to add a category
    const addedCategory = await categoryServices.addCategory(categoryData);

    return res.status(200).json(addedCategory);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    // Call the service to get all categories
    const categories = await categoryServices.getCategories();

    return res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.body.id;
    const categoryData = {
      categoryName: req.body.categoryName,
    };

    // Call the service to update a category
    const updatedCategory = await categoryServices.updateCategory(
      categoryId,
      categoryData
    );

    return res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.body.id;

    // Call the service function to delete a category
    const result = await categoryServices.deleteCategory(categoryId);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
