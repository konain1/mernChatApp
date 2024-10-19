const asyncHandler = require('express-async-handler');
const Chat = require('../model/chatModel');
const User = require('../model/userModel');


const accessChat = asyncHandler(async (req,res)=>{

    const {userId} = req.body;

    if (!userId) {
        res.status(400);
        throw new Error("Please provide user ID");
    }

    const chat = await Chat.find({
        isGroupChat:false,
        $and:[
            {
                users:{$elemMatch:{$eq : req.user._id}}
            },
            {
                users:{$elemMatch:{$eq : userId}}
            }
        ]
    }).populate('users','-password').populate('latestMessage')

    const isChat = await User.populate(chat,{
        path:'latestMessage.sender',
        select:'name email pic'
    })

    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        let chatData = {
            chatName : 'sender',
            isGroupChat:false,
            users:[req.user._id,userId]
        }

        try {
            
            const createdChat  = await Chat.create(chatData);

            const fullChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users","-password"
            )

            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400);
            throw new Error('chat creation Error ')
        }
    }
})

const fetchChats = asyncHandler(async(req,res)=>{

    try {
        
        const chats = await Chat.find({
            users:{$elemMatch:{ $eq:req.user._id } }
        }).populate('users','-password')
        .populate('groupAdmin','-password')
        .populate('latestMessage').sort({updateAt:-1})


        const populatedChats = await User.populate(chats,{
             path: 'latestMessage.sender',
            select: 'name email pic'
        })

        res.json(populatedChats);

    } catch (error) {
        res.status(400);
        throw new Error("Failed to fetch chats");
    }
})

module.exports = {accessChat,fetchChats}