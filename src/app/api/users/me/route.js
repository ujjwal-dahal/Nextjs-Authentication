import { NextResponse } from "next/server";
import User from "@/models/userModel";
import DatabaseConnection from "@/dbConnection/dbConnection";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import { writeFile } from "fs/promises";

DatabaseConnection();

export async function POST(request) {

  try {
    // Extract user ID from the token
    const userId = await GetDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token or user ID not found" },
        { status: 401 }
      );
    }

    // Find the user in the database and exclude the password field
    const user = await User.findOne({ _id: userId }).select("-password");

    // Check if the user was found
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // User found successfully, return user data
    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
