import mongoose from "mongoose";

export const connectDB=async  () =>{
    await mongoose.connect('mongodb+srv://vikalsingh:7706906396@cluster0.uvkv8.mongodb.net/doctor_appointment_app')
    .then(()=>console.log("DB Connected"));
}