import jwt from "jsonwebtoken"
const authMiddleware=async(req, res, next)=>{
    try {
        const token=req.headers.authorization;
        const verifyToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!verifyToken){
            return res.status(400).json({message:"Token error"});
        }
        req.locals=verifyToken.userId;
        next();
    } catch (error) {
        res.status(500).json({message:"token does'nt fetched"})
    }
}
export {authMiddleware};