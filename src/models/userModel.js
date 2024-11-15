import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username must be Unique"],
    required: [true, "Username is required"],
  },

  email: {
    type: String,
    unique: [true, "Email must be Unique"],
    required: [true, "Email is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  // Reference to ProfileImage model
  profileImage: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "ProfileImage" 
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

/*
-> Eddi "users" name gareko Model baneko cha bhane feri model banaudaina
-> mongoose.models.users means models haru ma bhaeko "users" model 
-> mongoose.model() le model banauca => 1st parameter chai "collection" ko name and 2nd is Schema
*/
