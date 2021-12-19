const jwt = require('jsonwebtoken')
exports.authorise = (req, res, next) => {

    if(!req.headers['authorization'])
    return res.status(403).json({errors: "include the bearer token"})

    const header = req.headers['authorization']

    const tokenArray = header.split(" ") //bearer

    const token = tokenArray[1]

    jwt.verify(token, process.env.secret, function(err, decoded) {
        
        if(err)
        return res.status(403).json({errors: "unauthorised"})
        
        req.user = {email:decoded.email, uuid: decoded.uuid}
        next()
        
    });

}