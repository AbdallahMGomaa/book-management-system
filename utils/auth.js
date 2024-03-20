const jwt = require('jsonwebtoken')
const secretKey = 'very-random-secret-key'

function generateToken(user) {
    return jwt.sign({id: user.id, email: user.username}, secretKey, {expiresIn: '1d'})
}


function verifyToken(token) {
    return jwt.verify(token, secretKey)
}


module.exports = {generateToken, verifyToken}