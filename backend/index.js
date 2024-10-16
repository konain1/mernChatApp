const express = require('express')
const charts =require('./data/chatData')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/charts',(req,res)=>{
    res.send(charts)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
