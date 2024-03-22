const jwt = require('jsonwebtoken')
const config = require('../config')


const secretKey = config.SECRET_KEY

function generateToken(user) {
    return jwt.sign({id: user.id, email: user.username}, secretKey, {expiresIn: '1d'})
}


function verifyToken(token) {
    return jwt.verify(token, secretKey)
}


module.exports = {generateToken, verifyToken}