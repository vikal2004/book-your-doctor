import express from "express"
import { deleteUser, updateProfile, userRegister } from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { getUser, getallUser } from "../controllers/userController.js";
const userRouter=express.Router();

userRouter.get('/getuser/:id', authMiddleware, getUser)
userRouter.get("/getalluser", authMiddleware, getallUser)
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put('/updateprofile', authMiddleware,updateProfile)
userRouter.delete("/deleteuser",deleteUser)

export default userRouter