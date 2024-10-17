import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3
    },
    lastName:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isDoctor:{
        type:Boolean,
        default:false,
    },
    age:{
        type:Number,
        default:null
    },
    gender:{
        type:String,
        default:"neither"
    },
    mobile:{
         type:Number,
         default:null,
    },
    address:{
        type:String,
        default:"",
    },
    status:{
        type:String,
        default:"Pending"
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    
},
{timestamps:true}
);

const userModel=mongoose.model("User", userSchema);

export default userModel;