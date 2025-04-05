import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId,io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSlidebar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filterUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filterUser);
    }
    catch(error){
        console.log("Error in getuserForSlidbar ",error.message);
        res.status(500).json({error:"Interval server error"});
    }
}

export const getMessages = async(req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId},
            ]
        });
        res.status(200).json(messages);
    }
    catch(error){
        console.log("Error in getting message");
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessages = async(req,res)=>{
    try{
        const {text,image} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            //upload base64 image to cloundinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image:imageUrl
        });
        await newMessage.save();
        //realtime function
        const reciverSocketId = getReciverSocketId(reciverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage)
    }   
    catch(error){
        console.log("Error in send message controller "+error.message);
        res.status(500).json({error:"Internal server error"});
    }
}