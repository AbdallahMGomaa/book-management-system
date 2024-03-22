const jwt = require('jsonwebtoken')
const {User} = require('../models/auth')

require('dotenv').config()

function authenticateUser(request, response, next) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.status(401).json({message: 'unauthorized'})
    }

    const token = authHeader.split(' ')[1]
    console.log(process.env.SECRET_KEY)
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
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