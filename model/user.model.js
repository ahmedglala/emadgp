const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Too short password"],
      
    },
    role:{
      type:String,
      enum:['customer','producer','admin'],
      required:true,
    },
    address:{
      type:String,
      required:true,
    },
    phone:{type:String,required:true},
    age:{
      type:Number,
      required:true,
      min:[18,'Too young'],
      
    }

  },
  {
    timeStamp: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports=User;