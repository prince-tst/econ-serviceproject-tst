const productServies = require("./productServices");

const addProduct = async (req, res, next) => {
  try {
    const productData = {
      productName: req.body.productName,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
    };

    // Call the service function to add a product
    const addedProduct = await productServies.addProductService(productData);

    return res.status(200).json(addedProduct);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Call the service function to get all products
    const products = await productServies.getProductsService();

    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.body.id;
    const productData = {
      productName: req.body.productName,
      price: req.body.price,
      stock: req.body.stock,
      categoryId: req.body.categoryId,
    };

    // Call the service function to update a product
    const updatedProduct = await productServies.updateProductService(
      productId,
      productData
    );

    return res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.message === "Product not found") {
      return res.status(404).json({ err: err.message });
    }
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.id;

    // Call the service function to delete a product
    const result = await productServies.deleteProductService(productId);

    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "Product not found") {
      return res.status(404).json({ err: err.message });
    }
    next(err);
  }
};
module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
