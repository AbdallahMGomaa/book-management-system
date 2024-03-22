const jwt = require('jsonwebtoken')
const {User} = require('../models/auth')
const config = require('../config')


function authenticateUser(request, response, next) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.status(401).json({message: 'unauthorized'})
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
        if (err) {
            return response.status(401).json({message: 'unauthorized'})
        }
        User.findByPk(decoded.id).then(user => {
            if (!user) {
                return response.status(401).json({message: 'unauthorized'})
            }
            request.user = user
            next()
        }).catch(err => {
            return response.status(500).json({message: 'internal server error'})
        })
    })
}

module.exports = {authenticateUser}