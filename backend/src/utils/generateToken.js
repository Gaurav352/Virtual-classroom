import jwt from "jsonwebtoken";
export const generateToken=(userId,res)=>{
    try {
        const token=jwt.sign({"userId":userId},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        console.log(token);
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true, //xss
            sameSite:"none",
            secure:process.env.NODE_ENV!=="development"
        })
    } catch (error) {
        
    }
}