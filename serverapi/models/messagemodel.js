const mongoose = require('mongoose');
const {messageSchema} = require('../schemas/messageschema')

const schema = mongoose.Schema(messageSchema)

exports.Message = mongoose.model('Message', schema)