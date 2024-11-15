import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageData: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", // This references the User model
  required: true, // Enforce a link between images and users
},

});

const ProfileImage = mongoose.models.ProfileImage || mongoose.model("ProfileImage", imageSchema);
export default ProfileImage;
