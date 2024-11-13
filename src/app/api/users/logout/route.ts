import DatabaseConnection from "@/dbConnection/dbConnection";
import jwt from "jsonwebtoken";
import { NextResponse , NextRequest } from "next/server";



DatabaseConnection();

export default async function GET(request : NextRequest){
  try {

    const response = NextResponse.json({
      message : "Logout Successfully",
      success : true
    },{status : 200})

    response.cookies.set("token","",{
      httpOnly : true,
      expires : new Date(0)
    }); //cookies clear gareko
    
  } catch (error : any) {
    return NextResponse.json({
      error : error.message
    } , {status : 500})
    
  }

}