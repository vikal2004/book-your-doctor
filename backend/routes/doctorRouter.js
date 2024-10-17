import express from "express"
import { authMiddleware } from "../middlewares/auth.js";
import { getalldoctors, applyfordoctor , getnotdoctors, deletedoctor ,acceptdoctor, rejectdoctor} from "../controllers/doctorController.js";

const doctorRouter=express.Router();

doctorRouter.get("/alldoctors", getalldoctors)
doctorRouter.get("/getnotdoctors", authMiddleware, getnotdoctors);
doctorRouter.post("/applyfordoctor",authMiddleware, applyfordoctor)
doctorRouter.put("/acceptdoctor",authMiddleware,  acceptdoctor)
doctorRouter.put('/rejectdoctor', authMiddleware,rejectdoctor)
doctorRouter.put("/deletedoctor", authMiddleware,deletedoctor)

export default doctorRouter;