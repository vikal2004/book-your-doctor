import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import notificationModel from "../models/notificationModel.js";
const getalldoctors=async (req, res)=>{
    try{
       let docs;
       if(!req.locals){
         docs=await doctorModel.find({isDoctor:true}).populate("userId");
       }else{
         docs=await doctorModel.find({isDoctor:true}).find({
            _id:{$ne:req.locals}
        }).populate("userId")
       }
       console.log(docs);
       return res.send(docs);
    }
    catch{
          res.status(500).send("unable to get all the doctors")
    }
}
//we want to retrieve all the doctors who is not verified for doctors.
const getnotdoctors=async(req, res)=>{
    try {
        const result=await doctorModel.find({isDoctor:false})
        .find({_id:{$ne:req.locals}})
        .populate("userId")
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send("unable to access get not doctors")
    }
}
const applyfordoctor=async(req, res)=>{
    try {
        const alreadyfound=await doctorModel.findOne({userId:req.locals});
        if(alreadyfound){
            return res.status(400).send('application already exists')
        }
        //create a new doctor with the form details
        const doctor=new doctorModel({
            ...req.body.formDetails,
            userId:req.locals}); 
            console.log("hi from try block")
            console.log("req.locals", req.locals);
            console.log("formDetails",req.body.formDetails);
            console.log(doctor);
            console.log("hi2 from try block")
            
            const result =await doctor.save();
        res.status(201).send("form submitted successfully");
    } catch (error) {
        res.status(500).send("unable to submit a form");
    }
}
const acceptdoctor=async(req, res)=>{
    try {
        const user=await userModel.findOneAndUpdate(
            {_id:req.body.id},
            {isDoctor:true, status:"accepted"}
            );
           
            const doctor=await doctorModel.findOneAndUpdate({
                userId:req.body.id},
                {isDoctor:true}
            );
            console.log(doctor);
            
         
         const notification=new notificationModel({
            userId:req.body.id ,
            content:`congratulation your application has been accepted `
        });
        console.log(notification);
         await notification.save();
    } catch (error) {
         res.status(500).send("can't accept doctor");
    }
}
const rejectdoctor=async(req, res)=>{
    try {
        console.log("3");
        const user=await userModel.findOneAndUpdate({_id:req.user.id},
        {isDoctor:false,status:"rejected"} );
        const deldoctor=await doctorModel.findOneAndDelete({userId:req.body.id});
       
        //create a new notification
        const notification=await notificationModel({userId:req.body.userId,content:`Sorry your application has been rejected`});
        await notification.save();
    } catch (error) {
        
    }
}
const deletedoctor=async (req, res)=>{
  try {
     const user=await userModel.findByIdAndUpdate(req.body.userId,{isDoctor:false,status:"pending"});
     const doctor=await doctorModel.findOneAndDelete({userId:req.body.userId});
     const notification=await notificationModel.findOneAndDelete({userId:req.body.userId});

     res.send("doctor deleted successfully")
  } catch (error) {
    res.status(500).send("unable to delete doctor")
  }
}

export {getalldoctors, applyfordoctor, getnotdoctors,deletedoctor, acceptdoctor, rejectdoctor};