import mongoose from "mongoose"

const notificationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isRead:{
        type:Boolean,
        default:false,
    },
    content:{
        type:String,
        default:""
    }
},{timestamps:true})

const notificationModel=mongoose.model("Notification", notificationSchema);

export default notificationModel;