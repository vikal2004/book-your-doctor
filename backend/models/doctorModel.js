import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }, 
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    fees:{
        type:Number,
        required:true,
    },
    isDoctor:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

const doctorModel=mongoose.model("Doctor",doctorSchema);

export default doctorModel 