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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
