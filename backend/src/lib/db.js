import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        let connection = await mongoose.connect(process.env.MONGOOB_URI);
        console.log("Connected");
    }
    catch(err){
        console.log("Not Connected");
    }
}