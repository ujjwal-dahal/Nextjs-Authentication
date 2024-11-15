import { NextResponse } from "next/server";
import DatabaseConnection from "../../../../dbConnection/dbConnection";
import ProfileImage from "../../../../models/imageModel";
import User from "../../../../models/userModel";
import { UploadImage } from "../../../../lib/upload-image-cloudinary";

DatabaseConnection();

export const POST = async (request) => {
  try {
    const reqBody = await request.formData();
    const userImage = reqBody.get("userImage");
    const userId = reqBody.get("userImageId");

    // Fetch user from the database
    const user = await User.findById(userId).populate("profileImage");

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    if (!userImage) {
      return NextResponse.json({ message: "No image found", success: false }, { status: 400 });
    }

    // Upload image to Cloudinary
    const resData = await UploadImage(userImage, "nextjs-authentication-user-profile");

    // Create a new ProfileImage document
    const newImage = new ProfileImage({
      imageUrl: resData?.secure_url,
      publicId: resData?.public_id,
      imageUserId: userId,
    });

    // Save the image to the database
    const savedImage = await newImage.save();
    if (!savedImage) throw new Error("Failed to save image");

    // Update the user's profileImage field with the saved image's ID
    user.profileImage = savedImage._id;
    await user.save();

    // Return the response with the updated user data including the image URL
    return NextResponse.json({
      message: "Image uploaded successfully",
      success: true,
      imageUrl: resData?.secure_url,  // Return the new image URL
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Failed to upload image", error: error.message, success: false },
      { status: 500 }
    );
  }
};
