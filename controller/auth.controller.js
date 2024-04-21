const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {apiError} = require("../utils/apiError");
const bcrypt = require("bcryptjs");




exports.signup = asyncHandler(async (req, res, next) => {
  
    const hashpassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashpassword;
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, "ahmedemad");
    delete user._doc.password;
    res.status(201).json({ user, token }); // Send an object containing user and token properties
  
  
});
exports.login =asyncHandler(async (req, res, next) => {
  
    const { email,password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(apiError('User not Fount',404));
    }
    const token = jwt.sign({ id: user._id }, "ahmedemad");
    const pass=bcrypt.compareSync(password,user.password);
    if(!pass) return next(apiError('Wrong Password',404));
    delete user._doc.password;
    res.status(201).json({ user, token });
   
});
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (
     req.headers.authorization 
    //&& req.headers.authorization.startsWith("Bearer")
  ) 
  {
    token = req.headers.authorization.split(" ")[1];
    
  }
  
    if(!token){return next(apiError('No token Found',404))}
  const  decode= jwt.verify(token,'ahmedemad');
    if(!decode)
    {
    return next(apiError('Unvalid Token'))

    }
    
     const user= await User.findById({_id:decode.id});
     if(!user){return next(apiError('No User Found for this Id'))};
     req.user=user;
     next();


});
exports.allowedTo = (...roles) =>
   async (req, res, next) => {
    
  
    if (!roles.includes(req.user.role)) {
    
    return next(apiError('User Not Authorized'))
    
    }
    next()
  
  
  };
