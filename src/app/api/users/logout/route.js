import DatabaseConnection from "@/dbConnection/dbConnection";
import { NextResponse } from "next/server";

DatabaseConnection();

export async function GET(request) {
  try {
    // Create the response with a success message
    const response = NextResponse.json(
      {
        message: "Logout Successfully",
        success: true,
      },
      { status: 200 }
    );

    // Clear the cookie by setting it with an expiration date in the past
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    });

    // Return the response
    return response;

  } catch (error) {
    // Handle errors
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
