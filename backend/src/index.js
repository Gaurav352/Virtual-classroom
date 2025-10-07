import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import documentRoutes from "./routes/document.route.js"
import { connectDB } from "./utils/db.js";

dotenv.config();
const app = express();
const PORT=process.env.PORT || 9000;
app.use(cors({
    origin:'http://localhost:5173',
    methods:["PUT","PATCH","GET","POST","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use("/api/document",documentRoutes);

app.get("/", (req, res) => {
  res.send("working!");
});
app.listen(PORT, () => console.log("Server running on port ",PORT));
connectDB();