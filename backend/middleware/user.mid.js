import jwt from 'jsonwebtoken';
import config from "/Users/harshmishra/Desktop/Course-selling-website/backend/config.js";

const userMiddeleware = (req, res, next) => {
    const authHeader=req.headers.authorization;
    

    if(!authHeader||!authHeader.startsWith("Bearer ")){ 
        return res.status(401).json({error: "No token, authorization denied"})
    }
    const token=authHeader.split(" ")[1];
    

    try {
        const decoded=jwt.verify(token, config.JWT_USER_PASSWORD)
        console.log(decoded)
        req.userId=decoded.id;
        
        
        next();
    } catch (error) {
        return res.status(403).json({error: "Token is not valid or expired"})
        console.log("Invalid token or expired token: " +error);
    }
} 

export default userMiddeleware;