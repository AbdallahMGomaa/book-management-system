const {User, Role, UserRole} = require('../models/auth')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/auth')
const sequelize = require('../db')
const {getUserRolesService} = require('../services/auth')


async function registerUser(request, response) {
    try {
        const {username, password} = request.body
        if (!validateEmail(email)) {
            throw new Error('invalid email')
        }
        if (!validatePassword(password)) {
            throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        }
        const hashedPassword = await bcrypt.hash(password, 15)
        const user = await User.create({username, password: hashedPassword})
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


async function loginUser(request, response) {
    try {
        const {username, password} = request.body
        const user = await User.findOne({where: {username}})
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