const express = require('express');

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  
} = require('../controller/cart.controller');
const authService = require('../controller/auth.controller');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('customer','admin'));

router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);



router
  .route('/:itemId')
  .put(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

module.exports = router;