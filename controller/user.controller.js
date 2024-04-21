const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { apiError } = require("../utils/apiError");
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({ users });
});
exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const users = await User.findById(id);
  if (!users) return next(apiError(`User not found for this id ${id}`, 404));
  res.status(200).json({ users });
});
exports.updateUser =asyncHandler( async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!user) {
    return next(apiError(`User not found for this id ${id}`, 404));
  }
  res.status(203).json({ user });
});
exports.createUser = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(201).json({ user });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  const user = await User.findByIdAndDelete(id);
  
  if (!user) {
    return next(apiError(`User not found for this id ${id}`,404))
  }
  res.status(201).json({ msg: "deleted succefully" });
  
});
