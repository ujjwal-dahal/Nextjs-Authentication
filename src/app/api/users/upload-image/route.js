import { NextResponse } from "next/server";
import DatabaseConnection from "../../../../dbConnection/dbConnection";
import ProfileImage from "../../../../models/imageModel";
import User from "../../../../models/userModel";
import { UploadImage } from "../../../../lib/upload-image-cloudinary";
import jwt from "jsonwebtoken";
import defaultImage from "../../../../../public/images/defaultUser.avif"


DatabaseConnection(); // Ensure database connection is initialized once

const GetDataFromToken = (request) => {
  try {
    // Extract the token from cookies
    const token = request.cookies.get("token")?.value || ""; // "token" is the cookie key

    if (!token) {
      throw new Error("No token found in cookies");
    }

    // Verify the token using the secret from environment variables
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Decode the token with the secret

    return decodedToken.id; // Assuming your token contains an "id" field
  } catch (error) {
    // Handle errors with a custom message
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

// GET API
export const GET = async (request) => {
  try {
    const userId = GetDataFromToken(request); 

    // Fetch user data and populate profileImage
    const user = await User.findById(userId).populate("profileImage");
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Structure the response
    const sendData = {
      imageUrl: user.profileImage?.imageUrl || defaultImage.src,
    };

    console.log(defaultImage)

    return NextResponse.json({
      userData: sendData,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message, success: false },
      { status: 500 }
    );
  }
};

// POST API
export const POST = async (request) => {
  try {
    const reqBody = await request.formData();
    const userImage = reqBody.get("userImage");
    const userId = reqBody.get("userImageId");

    // Validate input
    if (!userId || !userImage) {
      return NextResponse.json(
        { message: "Invalid input data", success: false },
        { status: 400 }
      );
    }

    // Fetch user and populate profileImage
    const user = await User.findById(userId).populate("profileImage");
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // If a previous image exists, handle deletion if necessary
    if (user.profileImage?.publicId) {
      // Optional: Add logic to delete the old image from Cloudinary
    }

    // Upload image to Cloudinary
    const resData = await UploadImage(userImage, "nextjs-authentication-user-profile");
    if (!resData?.secure_url || !resData?.public_id) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    // Create new ProfileImage document
    const newImage = new ProfileImage({
      imageUrl: resData.secure_url,
      publicId: resData.public_id,
      imageUserId: userId,
    });

    // Save the image document
    const savedImage = await newImage.save();
    if (!savedImage) throw new Error("Failed to save image");

    // Update user's profileImage reference
    user.profileImage = savedImage._id;
    await user.save();

    return NextResponse.json({
      message: "Image uploaded successfully",
      success: true,
      imageUrl: resData.secure_url, // Return the new image URL
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    return NextResponse.json(
      { message: "Failed to upload image", error: error.message, success: false },
      { status: 500 }
    );
  }
};
