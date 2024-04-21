const Product = require("../model/product.model");
const asyncHandler = require("express-async-handler");
const {apiError} = require("../utils/apiError");
// Create a new product
exports.createProduct =asyncHandler( async (req, res,next) => {
  
    // const { title, description, quantity, price, image, userId } = req.body;
    req.body.price = req.body.price * 1.05 + req.body.price;
    req.body.userId = req.user._id;
    console.log(req.file)
    const {path}=req.file
    const newPath= path.replace('\\','/');
    req.body.image=newPath;
    const product = await Product.create(req.body);

    res.status(201).json(product);
   
});

// Get all products
//
exports.getProducts =asyncHandler( async (req, res,next) => {
  
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 6;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit).populate({ path: 'userId', select: 'name email -_id' });
    res.status(200).json(products);
  
});

// Get a single product by ID
exports.getProductById =asyncHandler( async (req, res,next) => {
  
    const productId = req.params.id;
    const product = await Product.findById(productId).populate({ path: 'userId', select: 'name email -_id' });

    if (!product) {
      return next(apiError('Product Not Found',404));
    }

    res.status(200).json(product);
   
});

// Update a product by ID
exports.updateProduct =asyncHandler( async (req, res,next) => {
  
    const productId = req.params.id;

    const oldProduct = await Product.findById(productId);
    if(!oldProduct)  return next(apiError('Product not Found',404));
    if (oldProduct.userId == req.user._id || req.user.role=='admin') {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,

        req.body,
        { new: true } // Return the updated document
      );

      if (!updatedProduct) {
        return next(apiError('Product not Found',404));
      }

      res.status(200).json(updatedProduct);
    } else {
      return next(apiError("not allowed to modifie products except yours",401));
    }
  
});

// Delete a product by ID
//herewe add some thins to ccahnge
exports.deleteProduct = async (req, res,next) => {
  
    const productId = req.params.id;
    const oldProduct = await Product.findById(productId);
    if(!oldProduct)return next(apiError('Product not Found',404));
    if (oldProduct.userId == req.user._id || req.user.role=='admin') {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return next(apiError('Product not Found',404));
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return next(apiError("not allowed to modifie products except yours",401));
    }
  
};
