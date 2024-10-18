const express = require('express')
const router = express.Router();
const { verifyJWT} = require('../middleware/authenticationMiddleware')
const {accessChat} =require('../Controller/chatController')
const route = express.Router();

// route.get('/',verifyJWT,fetchChats)
route.post('/',verifyJWT,accessChat)
// route.post('/group',verifyJWT,CreateGroupChat)
// route.put('/rename',verifyJWT,renameGroup)
// route.put('/groupremove',verifyJWT,removeFromGroup)
// route.put('/groupadd',verifyJWT,addToGroup)


module.exports = route


