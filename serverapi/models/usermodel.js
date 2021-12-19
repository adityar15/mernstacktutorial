const {userSchema} = require('../schemas/userschema')
const mongoose = require('mongoose')


const schema = mongoose.Schema(userSchema)
const User = mongoose.model('User', schema)

exports.User = User