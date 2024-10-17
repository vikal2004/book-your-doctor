import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const getUser= async(req, res)=>{
 try {
    
    const user=await userModel.findById(req.params.id).select("-password")
    if(!user){
        return res.status(400).json({message:"No user found"})
    }
    return res.send(user);
 } catch (error) {
    res.status(500).send("Unable to get user");
 }
}
const getallUser=async(req, res)=>{
try {
    const allUser=await userModel.find({ _id: { $ne: req.locals.userId } }).select("-password");
    if(!allUser){
        return res.status(400).send("does'nt fetched allUsers");
    }

    return res.status(201).send({message:"get all the user successfull", allUser});
} catch (error) {
     return res.status(500).send("Error while fetching list of all users");
} 
}
const userLogin=async(req, res)=>{
    const {email, password}=req.body;
   try {
       const emailPresent=await userModel.findOne({email:email});
       if(!emailPresent){
           return res.status(400).send("Enter valid Email")
        }
        
        //verify the password
        const verifyPass=await bcrypt.compare(password, emailPresent.password)
        if(!verifyPass){
            return res.status(400).send("Invalid credentials");
        }
        
        //now create a token
        const token=jwt.sign({userId:emailPresent._id, idAdmin:emailPresent.isAdmin}, process.env.JWT_SECRET_KEY,
            {
                expiresIn:"2 days"
            }
        );
        console.log("hi from try block")
     return res.status(201).send({
        message:"user loggedIn successfully",
        token:token
     })
   } catch (error) {
      res.status(500).send(
        "Unable to Login User"
      )
   }

}
const userRegister=async (req, res)=>{
    try {
        const emailPresent=await userModel.findOne({email:req.body.email});
        if(emailPresent){
            return res.status(400).send("Email already existed")
        }
        
        //hash the password
        const hashedpass=await bcrypt.hash(req.body.password,10)
        
        //create a entry in database 
        const user=await userModel({...req.body, password:hashedpass})
      
        //save the user in the database
        
        const result =user.save();
         if(!result){
            return res.status(500).send("unable to register user");
         }

         //create a token
         return res.status(201).send("User Registered successfully")
    } catch (error) {
        console.log("hi from error block")
        res.status(500).send("Unable to register user")
    }
}
const updateProfile=async (req, res)=>{
   try {
     const hashedpass=await bcrypt.hash(req.body.password, 10);
     const result=await userModel.findByIdAndUpdate(
        {_id:req.locals},
        {...req.body, password:hashedpass}
    )
   if(!result){
     return res.status(500).send("unable to update user")
   }
   return res.status(201).send("user updated successful")
   } catch (error) {
      res.status(500).send("Error occur while updating user")
   }
}
const deleteUser=async(req, res)=>{
 try {
     // 1. Delete the user from the userModel by their userId.
     const result=await userModel.findByIdAndDelete(req.body.userId);
     
     // 2. Delete the doctor associated with this user (if the user is a doctor).
     const removeDoc=await doctorModel.findOneAndDelete({userId:req.body.userId})
     console.log("hi from try block")

    // 3. Delete any appointments associated with this user (if they have appointments).
    const removeAppoint=await appointmentModel.deleteMany({userId:req.body.userId})

    return res.send("user deleted successfully")
 } catch (error) {
    return res.status(500).send("unable to delete user")
 }
}

export {userRegister, userLogin, getUser, getallUser, updateProfile, deleteUser};