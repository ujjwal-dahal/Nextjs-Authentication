import mongoose from "mongoose";

// Define schema for storing images
const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true, // URL to the image
    },
    publicId: {
      type: String,
      required: true, // Public ID for Cloudinary or other services
    },
    imageUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure linkage to a user
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

const ProfileImage =
  mongoose.models.ProfileImage || mongoose.model("ProfileImage", imageSchema);

export default ProfileImage;
