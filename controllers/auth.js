const {User} = require('../models/auth')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/auth')
const {createUser, getUserRolesService} = require('../services/auth')
const { validateEmail, validatePassword } = require('../validators/auth')


async function registerUser(request, response) {
    try {
        const {email, password} = request.body
        const user = createUser(email, password, validateEmail, validatePassword)
        const token = generateToken(user)
        response.status(200).json({token})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}


async function loginUser(request, response) {
    try {
        const {email, password} = request.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new Error('user not found')
        }
        const passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) {
            throw new Error('invalid password')
        }
        const token = generateToken(user)
        
        response.status(200).json({user: {
            id: user.id,
            username: user.username
        }, token})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

async function getUserRoles(request, response){
    try {
        const userId = request.user.id
        const userRoles = await getUserRolesService(userId)
        response.status(200).json({userRoles})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}


module.exports = {registerUser, loginUser, getUserRoles}