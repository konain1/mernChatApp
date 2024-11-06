const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const chats =require('./data/chatData')
const connectDB = require('./config/db')
const app = express()
const userRoute = require('./route/userRoute')
const chatRoute = require('./route/chatRoute')
const messageRoute = require('./route/messageRoute')



connectDB();

const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json());

app.use('/api/user',userRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
