import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Extract form data from the request
    const reqBody = await request.formData();
    const userImage = reqBody.get("userImage");

    if (!userImage) {
      return NextResponse.json(
        {
          message: "No image found",
          success: false,
        },
        { status: 400 }
      );
    }

    // Convert to buffer
    const byteData = await userImage.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Path to save the uploaded image
    const path = `./public/userImages/${userImage.name}`;
    await writeFile(path, buffer);

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        message: "Failed to upload image",
        error: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
