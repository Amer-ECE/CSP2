const Product = require("../models/product");

// Add product
module.exports.addProduct = (body) => {
  let newProduct = new Product({
    title: body.title,
    description: body.description,
    price: body.price,
    imageUrl: body.imageUrl,
    quantity: body.quantity,
    category: body.category,
  });

  return newProduct.save().then((product, err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

// Get all products.
module.exports.allActiveProducts = () => {
  return Product.find({}).then((data) => {
    return data;
  });
};

// New Added products .. 4 limit
module.exports.newAdded = () => {
  return Product.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .then((data) => {
      return data;
    });
};

// Get specific product.
module.exports.getSpecificProduct = (productId) => {
  return Product.findById(productId).then((data) => {
    return data;
  });
};

// Update a product.
module.exports.updateProduct = (productId, body) => {
  let updateProduct = {
    title: body.title,
    description: body.description,
    price: body.price,
    imageUrl: body.imageUrl,
    quantity: body.quantity,
    category: body.category,
  };

  return Product.findByIdAndUpdate(productId, updateProduct).then(
    (product, err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};

// Archive a product.
module.exports.archiveProduct = (productId, body) => {
  let archiveProduct = {
    isActive: false,
  };

  return Product.findByIdAndUpdate(productId, archiveProduct).then(
    (product, err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};

module.exports.toggleArchive = (productId, body) => {
  let archiveProduct = {
    isActive: body.isActive,
  };

  return Product.findByIdAndUpdate(productId, archiveProduct).then(
    (product, err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};
