import { NextResponse } from "next/server";
import DatabaseConnection from "../../../../dbConnection/dbConnection";
import ProfileImage from "../../../../models/imageModel";
import User from "../../../../models/userModel";


DatabaseConnection();

export const POST = async (request) => {
  try {
    const reqBody = await request.formData();
    const userImage = reqBody.get("userImage");
    const userId = reqBody.get("userImageId");

    const user = await User.findById(userId).populate("profileImage");

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }


    if (!userImage) {
      return NextResponse.json({ message: "No image found", success: false }, { status: 400 });
    }

    const byteData = await userImage.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const newImage = new ProfileImage({
      imageName: userImage.name,
      imageData: buffer,
      contentType: userImage.type,
      imageUserId : userId
    });

    const savedImage = await newImage.save();
    if (!savedImage) throw new Error("Failed to save image");

    return NextResponse.json({
      message: "Image uploaded successfully",
      success: true,
      imageData: `data:${savedImage.contentType};base64,${buffer.toString("base64")}`,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: "Failed to upload image", error: error.message, success: false },
      { status: 500 }
    );
  }
};
