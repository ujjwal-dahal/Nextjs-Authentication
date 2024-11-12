/*
Next.js ma Every Time Database sanga kaam garda Database Sanga Connect garnu parcha

Tara Express.js ma Ek palta Database connect garesi huncha
*/

/*
import garda "@" le root directory i.e src bujincha

*/

import DatabaseConnection from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import {NextRequest , NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/emailSend";

DatabaseConnection(); //Abo Database Connect bhayo


export async function POST(request : NextRequest){

  try {

    const reqBody = await request.json();  //JSON Response aaucha i.e User le Enter gareko data

    const {username , email , password} = reqBody;

    //Validation

    console.log(reqBody);

    //User Lai Regester Garne

    //Check garne user alrady exist garcha ki gardaina

    let existUser : any = await User.findOne({email}); //Email already chaki chaina

    if(existUser){
      return NextResponse.json({error : "User Already Exist"},{status : 400});
    }
    

    //Abo User exist gareko chaina bhane Register garne database ma
    //Tyo Bhanda aagadi Password lai hash garne

    const hashedPassword = await bcrypt.hash(password , 10); //hash password

    //await User.create({
    //   username , 
    //   email , 
    //   password : hashedPassword
    // }); //Esle new user create garcha ani Database ma immediately save garcha

    const newUser = new User({
      username ,
      email,
      password : hashedPassword
    }); //Esle new user create garcha tara database ma save gardaina

    const savedUser = await newUser.save(); //database sanga interact gareko le await use gareko

    console.log(savedUser);

    //Abo Send Mail Verification after Saving user in database

    await sendMail({email : email , emailType : "VERIFY" , userId : savedUser._id});

    return NextResponse.json({
      message : "User Register Successfully",
      success : true,
      savedUser })








    
  } catch (error : any) {

    return NextResponse.json({error : error.message},{status : 500})
    
  }
}




