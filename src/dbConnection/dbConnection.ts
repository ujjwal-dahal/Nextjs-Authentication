import mongoose from "mongoose";

/*
Trick :
Database jaile arko Continent ma huncha => So async use garne

ani Database ko Connection Sure hudaina => So try catch use garne
*/



export default function DatabaseConnection(){
  try {
    mongoose.connect(process.env.MONGO_URI!); //"!" sign le 100% ya string value aaucha bhaneko ho

    const connection =  mongoose.connection;//yo connection variable ma different events haru chan

    connection.on("connected",()=>{
      console.log("MongoDB is Connected")
    })

    connection.on("error",(err)=>{
      console.log("MongoDB is unable to Connect : ",err);
      process.exit(); //exit garna
    })
    
  } catch (error) {
    console.log("Something Went Wrong in Connecting to Database");
    console.log(error);
  }

}