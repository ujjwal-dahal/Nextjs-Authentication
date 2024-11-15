import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";


export const sendMail = async ({email , emailType , userId})=>{
  const hashedToken = await bcrypt.hash(userId.toString(), 10);
  try {
    if(emailType === "VERIFY"){
      //abo Verify Token and Expiry Date chai Database ma halne

      // let hashedToken = await bcrypt.hash(userId.toString(), 10);

      await User.findByIdAndUpdate(userId,
        { $set : {
          verifyToken : hashedToken,
          verifyTokenExpiry : Date.now() + 3600000
        } }
      ) //id ko help le database ma user find garcha ani Update garcha 
    }
    else if(emailType === "RESET"){

      await User.findByIdAndUpdate(userId,
       { $set : {
          forgotPasswordToken : hashedToken,
          forgotPasswordTokenExpiry : Date.now() + 3600000
        } }
      )
    }



    
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "toppelp@gmail.com", // sender address
      to: email, // list of receivers
      subject: emailType==="VERIFY" ? "Verify Your Email" :"Reset Your Password", // Subject line
      html: emailType=== "VERIFY" ?  
      
      `<p>
      Click <a href="${ process.env.DOMAIN }/verifyemail?token=${hashedToken}">Here</a> to verify your email
      or Copy & Paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
      : 
      `Click <a href="${ process.env.DOMAIN }/resetpassword?token=${hashedToken}">Here</a> to reset your password"
      or Copy & Paste the link below in your browser.
      <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
      </p>` ,
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse;
    
  } catch (error ) {

    throw new Error(error.message)
    
  }

}