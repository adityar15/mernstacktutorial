const {refreshtokenSchema} = require('../schemas/refreshtokenschema')
const mongoose = require('mongoose')


const schema = mongoose.Schema(refreshtokenSchema)
const RefreshToken = mongoose.model('RefreshToken', schema)

exports.RefreshToken = RefreshToken