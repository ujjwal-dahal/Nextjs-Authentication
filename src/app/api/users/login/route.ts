import { NextResponse, NextRequest } from "next/server";
import DatabaseConnection from "@/dbConnection/dbConnection";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

// Establish the database connection
DatabaseConnection();

export async function POST(request: NextRequest) {
  try {
    // Parse JSON data from the request body
    const reqBody = await request.json();
    const {email, password } = reqBody;
    console.log(reqBody)

    // Find the user by email and username
    const user = await User.findOne({ email});
    if (!user) {
      return NextResponse.json(
        { message: "User does not Exist" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    //JWT ma payload means data
    const tokenData = {
      id : user._id,
      username : user.username,
      email : user.email,
    }

    const jwtToken = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn : '1d'})

    // Successful login response
    const response = NextResponse.json(
      { message: "Successfully Logged In", success: true },
      { status: 200 }
    );

    //abo yo response ma hamile cookies pathauna sakchum

    response.cookies.set("token" , jwtToken, {
      httpOnly : true
    })


    return response ; //abo response return bhayo

  } catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
    );
}
}
