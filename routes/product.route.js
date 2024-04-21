const express= require('express') ;
const {protect,allowedTo}=require('../controller/auth.controller')
const {deleteProduct,createProduct,getProductById,getProducts,updateProduct}=require('../controller/product.controller');
const upload = require('../middleware/multer');

const router=express.Router();

router.route('/').get(protect,getProducts).post(protect,  allowedTo('admin','producer'),upload.single('image'),createProduct);
router
  .route('/:id')
  .get(protect, getProductById)
  .put(protect,  allowedTo('admin','producer'),updateProduct)
  .delete(protect,  allowedTo('admin','producer'), deleteProduct);
module.exports=router;