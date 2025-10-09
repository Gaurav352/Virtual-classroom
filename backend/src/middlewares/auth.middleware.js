import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const authMiddleware = async (req, res,next) => {
  try {
    const token = req.cookies.jwt;
    //console.log(token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};