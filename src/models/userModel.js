import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username : {
    type : String,
    unique : [true , "Username must be Unique"],
    required : [true , "Username is require"] //eddi user le username diyena bhane 2nd index ko value jancha
  },

  email : {
    type:String,
    unique : [true , "Email must be Unique"],
    required : [true , "Email is require"]
  },

  password : {
    type : String,
    required : [true , "Password must be fill"]
  },

  isVerified : {
    type : Boolean,
    default : false
  },

  isAdmin : {
    type : Boolean ,
    default : false
  },

  forgotPasswordToken : String,
  forgotPasswordTokenExpiry : Date,
  verifyToken : String,
  verifyTokenExpiry : Date,

  profileImage: { type: mongoose.Schema.Types.ObjectId, ref: "ProfileImage" },

})


const User = mongoose.models.User || mongoose.model("User", userSchema);
/*
-> Eddi "users" name gareko Model baneko cha bhane feri model banaudaina
-> mongoose.models.users means models haru ma bhaeko "users" model 
-> mongoose.model() le model banauca => 1st parameter chai "collection" ko name and 2nd is Schema
*/

export default User;