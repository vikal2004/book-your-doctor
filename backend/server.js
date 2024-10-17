import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"
import cors from "cors"
import path from "path"
import { connectDB } from "./db/conn.js"
import userModel from "./models/userModel.js"
import userRouter from "./routes/userRouter.js"
import doctorRouter from "./routes/doctorRouter.js"
const app=express();
const PORT=process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);

connectDB()

app.get("/", (req, res)=>{
    res.send("hi there");
})

app.listen(PORT, ()=>{
    console.log(`your app is listening at http://localhost:5000`);
})