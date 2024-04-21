const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  
  updateOrderToPaid,
  updateOrderToDelivered,
  
} = require('../controller/order.controller');

const authService = require('../controller/auth.controller');

const router = express.Router();

router.use(authService.protect);


router.route('/:cartId').post(authService.allowedTo('customer','admin'), createCashOrder);
router.get(
  '/',
  authService.allowedTo('customer', 'admin', 'producer'),
  
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  authService.allowedTo('admin', 'producer'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.allowedTo('admin', 'producer'),
  updateOrderToDelivered
);

module.exports = router;