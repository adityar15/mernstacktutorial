const express = require('express');
const router = express.Router()

const {sendMessage, getAllMessages, deleteMessage} = require('../controller/messagecontroller')

const {body} = require('express-validator')
const {getUserByUUID} = require('../controller/usercontroller')

router.get('/:receiver_id', getAllMessages)

router.post('/send', body('text').not().isEmpty().escape().trim(), body('rec_id').custom(async(uuid)=>{
    const user = await getUserByUUID(uuid)
    if(!user){
        return Promise.reject('user does not exists')
    }
}),sendMessage)

router.post('/delete', body('message_id').custom(async(uuid)=>{
    const message = await getMessageWithUUID(uuid)
    if(!message){
        return Promise.reject('message does not exists')
    }
}),deleteMessage)

exports.messagerouter  = router