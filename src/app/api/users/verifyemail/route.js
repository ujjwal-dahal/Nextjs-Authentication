import DatabaseConnection from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

DatabaseConnection();

export async function POST(request){
  try {

    const reqBody = await request.json();

    const { token } = reqBody;
    console.log(token)

    const user = await User.findOne({
      verifyToken : token,
      verifyTokenExpiry : {$gt : Date.now()}
    });

    if(!user){
      return NextResponse.json({error : "Invalid Token"},{status : 400})
    }

    console.log(user)

    user.isVerified = true; //eddi user return bhayo bhane isVerified value true huncha
    user.verifyToken = undefined; //abo use verify bhaesi verifyToken haru hatako
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message : "Email verified successfully",
      success : true,
    },{status : 200})

    
  } catch (error) {
    return NextResponse.json({error : error.message},{status : 500})
    
  }
}