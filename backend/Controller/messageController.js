const expressAsyncHandler = require("express-async-handler");
const Message = require('../model/messageModel');
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const sendMessage = expressAsyncHandler(async (req,res)=>{

    const {content,chatId} = req.body;
    let newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId
        }

        try {

            let message = await Message.create(newMessage)
            message = await message.populate("sender","name email pic")

            message = await message.populate("chat")

            message = await User.populate(message,{
                path:"chat.users",select:"name pic email"
            })

            res.json(message)
        await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message})
            
        } catch (error) {
            throw new Error(error)
            res.statusCode(400);
            res.json(error)
        }
})

const allMessages = expressAsyncHandler(async(req,res)=>{

    try {
        
        const messages = await Message.find({chat:req.params.chatId}).populate("sender","name email pic")

     res.json(messages)
    } catch (error) {
    
        res.status(400)
        throw new Error(error)
    }

    

})

module.exports ={sendMessage,allMessages}