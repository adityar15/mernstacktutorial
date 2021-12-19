
const express = require('express')

const router = express.Router()
const {register, getUserByEmail, login, grantNewToken, logout, getUserByUUID, getContacts} = require('../controller/usercontroller')
const {RefreshToken} = require('../models/refreshtokenmodel')
const {body} = require('express-validator')
const { connect } = require('../connection')
const { authorise } = require('../authorise')



router.post('/register', body('email').isEmail().custom(
    async (email) => {
        const user = await getUserByEmail(email)
        if(user)
        return Promise.reject("User already exists")
    }
),

body('password').isLength({min:6, max:14}),
body('name').not().isEmpty(),
register)


router.post('/logout', logout)


router.post('/login', body('email').isEmail().custom(
    async (email) => {
        const user = await getUserByEmail(email)
        if(!user)
        return Promise.reject("Email does not exists")
    }
),

body('password').isLength({min:6, max:14}),
login)


router.post('/refreshtoken', grantNewToken)



router.get('/contacts', body('uuid').custom(  async (email) => {
    const user = await getUserByUUID(email)
    if(!user)
    return Promise.reject("User does not exists")
}), authorise, getContacts)



exports.userrouter = router