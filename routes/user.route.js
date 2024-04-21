const express= require('express') ;
const {protect,allowedTo}=require('../controller/auth.controller')
const {deleteUser,createUser,getUserById,getUsers,updateUser}=require('../controller/user.controller');

const router=express.Router();

router.route('/').get(protect, allowedTo('admin'),getUsers).post(protect, allowedTo('admin'),createUser);
router
  .route('/:id')
  .get(protect, allowedTo('admin'),getUserById)
  .put(protect, allowedTo('admin'),updateUser)
  .delete(protect, allowedTo('admin'), deleteUser);
module.exports=router;