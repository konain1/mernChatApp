
const mongoose  = require('mongoose')


const chatModel  = new mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat : {type:Boolean,default:false},
    users:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    lastestmessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true}
)

let Chat = mongoose.model('Chat',chatModel)

module.exports = Chat