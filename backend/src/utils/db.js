import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log(res.connection.host);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
    }
}