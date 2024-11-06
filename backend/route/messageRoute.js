
const express=require('express');
const { verifyJWT } = require('../middleware/authenticationMiddleware');
const {sendMessage,allMessages}= require('../Controller/messageController')



const router = express.Router();

router.post('/',verifyJWT,sendMessage);
router.get('/:chatId',verifyJWT,allMessages);



module.exports = router