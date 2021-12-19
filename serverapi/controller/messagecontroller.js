const {connect} = require('../connection')
// const {User} = require('../models/usermodel')
const {Message} = require('../models/messagemodel')
const {v4} = require('uuid')

const {validationResult} = require('express-validator')


async function sendMessage(req, res){
    const errors = validationResult(req)
    if(!errors.isEmpty())
    return res.status(400).json({errors: errors.array()})
    await connect()
    const message = new Message({
        uuid:  v4(), // String is shorthand for {type: String}
        sender: req.user.uuid,
        receiver:   req.body.rec_id,
        content: req.body.text,
    })

    await message.save()


    const Pusher = require("pusher");

    const pusher = new Pusher({
    appId: process.env.pusher_app_id,
    key: process.env.pusher_key,
    secret: process.env.pusher_secret,
    cluster: process.env.pusher_cluster,
    useTLS: true
    });

    pusher.trigger("channel-"+req.body.rec_id, "event-"+req.body.rec_id, {
    message: req.body.text,
    sender_uuid: req.user.uuid
    });

    res.send('Message sent')
}



async function getAllMessages(req, res){
    const messages = await Message.find({$or:[ {receiver: req.params.receiver_id} ,{receiver:req.user.uuid }]}).exec()
    res.send(messages)
}



async function deleteMessage(req, res){
    await Message.deleteOne({uuid: req.body.uuid})
    res.send("Message deleted successfully")
}


async function getMessageWithUUID(uuid){
    await connect()
    return await Message.findOne({uuid:uuid}).exec()
}

exports.sendMessage = sendMessage
exports.getAllMessages = getAllMessages
exports.deleteMessage = deleteMessage