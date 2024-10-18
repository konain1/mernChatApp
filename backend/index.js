const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const chats =require('./data/chatData')
const connectDB = require('./config/db')
const app = express()
const userRoute = require('./route/userRoute')



connectDB();

const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json());

app.use('/api/user',userRoute)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/api/chats',(req,res)=>{
//     res.send(chats)
// })

// app.get('/api/chats/:id',(req,res)=>{
//     console.log('----------------------')
//     const chatId = req.params.id;
//     console.log(chatId)
//     let singleChat = chats.find((c)=>c._id === chatId)
//     console.log("chatid ",singleChat)
//     res.send(singleChat)
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
