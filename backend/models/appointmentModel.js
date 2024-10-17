import mongoose from "mongoose";

const appointmentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
}
)

const appointmentModel=mongoose.model("Appointment", appointmentSchema);
export default appointmentModel;