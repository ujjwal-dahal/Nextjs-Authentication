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

DatabaseConnection(); //Abo Database Connect bhayo


export async function POST(request : NextRequest){

  try {

    
  } catch (error : any) {

    return NextResponse.json({error : error.message},{status : 500})
    
  }
}




