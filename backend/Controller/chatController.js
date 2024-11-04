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


const CreateGroupChat = asyncHandler(async (req,res)=>{
    const {users,GroupName}= req.body;

    if (!users || !GroupName) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    let userArray = typeof users === 'string' ? JSON.parse(users) : users;
    console.log( "length ",userArray.length)

    if(userArray.length < 2){
        res.status(400);
        throw new Error("More than 2 users required for a group chat");
    }

    userArray.push(req.user._id);

    try {
        const groupChat = await Chat.create({
            chatName: GroupName,
            isGroupChat: true,
            users: userArray,
            groupAdmin: req.user._id
        });

        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        res.status(201).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error("Failed to create group chat");
    }

})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
        res.status(400);
        throw new Error("Please provide chat ID and new name");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
    )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    }

    res.json(updatedChat);
});

const addToGroup = asyncHandler(async(req,res)=>{
   
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        res.status(400);
        throw new Error("Please provide chat ID and user ID");
    }

    const chat = await Chat.findById(chatId);
    
    // Check if requester is admin
    if (chat.groupAdmin.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Only admin can add members");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    ).populate('users','-password' )
    .populate('groupAdmin','-password')

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    }

    res.json(updatedChat);


})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        res.status(400);
        throw new Error("Please provide chat ID and user ID");
    }

    const chat = await Chat.findById(chatId);
    
    // Check if requester is admin
    if (chat.groupAdmin.toString() !== req.user._id.toString() ) {
        res.status(403);
        throw new Error("Only admin can remove members");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found");
    }

    res.json(updatedChat);
});

const leaveGroup = asyncHandler(async (req, res) => {
    const { chatId } = req.body;
    const userId = req.user?._id; // Check if req.user is populated

    // Ensure chatId and userId are provided
    if (!chatId || !userId) {
        res.status(400);
        throw new Error("Please provide chat ID and ensure you are authenticated");
    }

    // Find the chat and remove the user from the participants list
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } }, // Remove the user from the `users` array
        { new: true } // Return the updated chat document
    ).populate('users', '-password'); // Optional: populate user data excluding password

    // If no chat is found, return an error
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat not found or you are not a participant");
    }

    // Respond with the updated chat document
    res.json({
        success: true,
        message: "Successfully left the group",
        chat: updatedChat,
    });
});


module.exports = {accessChat,leaveGroup,fetchChats,CreateGroupChat,renameGroup,addToGroup,removeFromGroup}