const { connect } = require("../connection");
const { User } = require("../models/usermodel");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { RefreshToken } = require("../models/refreshtokenmodel");

const {getRefreshToken} = require('../parsecookie')

function logout(req, res, next) {
  res.clearCookie("refresh_token")
  res.send({
    message: "User Logged out"
  })
}



async function register(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  await connect();

  const email = req.body.email,
    password = req.body.password,
    name = req.body.name;

  const user = new User({
    email: email,
    password: bcrypt.hashSync(password, 10),
    name: name,
    uuid: v4(),
  });

  await user.save();

  const token = generateToken({ email: user.email, uuid: user.uuid });
  const rtoken = await generateRefreshToken({
    email: user.email,
    uuid: user.uuid,
  });
  res.cookie("access_token", token, {
    expires: new Date(Date.now() + process.env.access_token_expiry * 1000),
    // httpOnly: true,
  });

  res.cookie("refresh_token", rtoken, {
    expires: new Date(Date.now() + process.env.refresh_token_expiry * 365 * 24 * 3600000),
    httpOnly: true,
  });

  res.send({
    user: exposeUserDetails(user),
    token: token,
    refresh_token: rtoken,
  });
}

async function login(req, res) {
  const email = req.body.email,
    password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const user = await getUserByEmail(email);
  // console.log(getRefreshToken(req.headers.cookie));
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = generateToken({ email: user.email, uuid: user.uuid });
    const rtoken = await generateRefreshToken({
      email: user.email,
      uuid: user.uuid,
    });
    res.cookie("access_token", token, {
        expires: new Date(Date.now() + process.env.access_token_expiry * 1000),
        // httpOnly: true,
    });

    res.cookie("refresh_token", rtoken, {
        expires: new Date(Date.now() + process.env.refresh_token_expiry * 365 * 24 * 3600000),
        httpOnly: true,
      });

    res.send({
      user: exposeUserDetails(user),
      token: token,
      refresh_token: rtoken,
    });
  } else return res.status(403).json({ errors: "Incorrect credentials" });
}

async function getUserByEmail(email) {
  await connect();
  return User.findOne({ email: email }).exec();
}

async function getUserByUUID(uuid) {
  await connect();
  return User.findOne({ uuid: uuid }).exec();
}

function generateToken(user) {
  return jwt.sign(user, process.env.secret, {
    expiresIn: `${process.env.access_token_expiry}s`,
  });
}

async function generateRefreshToken(user) {
  const rt = jwt.sign(user, process.env.refresh_secret, { expiresIn: `${process.env.refresh_token_expiry}y` });
  const refreshToken = new RefreshToken({ token: rt });
  await refreshToken.save();
  return rt;
}


async function grantNewToken(req,res)
{

    const rtoken = getRefreshToken(req.headers['cookie'])
    await connect()
    const token_details = await RefreshToken.findOne({token: rtoken}).exec()
    if(!token_details)
    return res.status(403).json({errors: "Invalid token"})


    jwt.verify(rtoken, process.env.refresh_secret, function(err, decoded) {

        if(err)
        { 
            return res.status(403).json({errors: "unauthorised"})
        }
        const newtoken = generateToken({email: decoded.email, uuid: decoded.uuid})
        res.cookie("access_token", newtoken, {
            expires: new Date(Date.now() + process.env.access_token_expiry * 1000),
            // httpOnly: true,
          });
         
        res.send({
          token: newtoken
        });
        
    });
}


function exposeUserDetails(user) {
  return {
    email: user.email,
    name: user.name,
    contacts: user.contacts,
    uuid: user.uuid,
  };
}


async function getContacts(req,res)
{
  await connect()
  const user =  await User.findOne({ uuid: req.user.uuid }).exec()
  
  const contacts = await User.find({"uuid": {"$in":user.contacts}}).exec()

  const contactDetails = contacts.map(contact => exposeUserDetails(contact))

  res.send(contactDetails)
}

exports.register = register;
exports.getUserByEmail = getUserByEmail;
exports.login = login;
exports.logout = logout;
exports.getUserByUUID = getUserByUUID;
exports.grantNewToken = grantNewToken; 
exports.getContacts = getContacts;