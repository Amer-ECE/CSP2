const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const auth = require("../auth");
// const {route} = require("./user");

// route for adding new product.
router.post("/", auth.verify, (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    productController
      .addProduct(req.body)
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

// Router for getting all active products.
router.get("/", (req, res) => {
  productController
    .allActiveProducts()
    .then((dataFromController) => res.send(dataFromController));
});

// Router to get specific product.
router.get("/:productId", (req, res) => {
  productController
    .getSpecificProduct(req.params.productId)
    .then((dataFromController) => res.send(dataFromController));
});

// Route to update a product.
router.put("/:productId", auth.verify, (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    productController
      .updateProduct(req.params.productId, req.body)
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

// Route to archive a product.
router.delete("/:productId", auth.verify, (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    productController
      .archiveProduct(req.params.productId, req.body)
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

module.exports = router;
