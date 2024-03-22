const { User, Role } = require('../models/auth')
const bcrypt = require('bcryptjs')


async function createUser(email, password, validateEmail, validatePassword) {
    if (!validateEmail(email)) {
        throw new Error('invalid email')
    }
    if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }
    const hashedPassword = await bcrypt.hash(password, 15)
    const user = await User.create({ email, password: hashedPassword })
    return user
}

async function getUserRolesService(userId) {
    const userRoles = await Role.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: User,
            attributes: [],
            where: { id: userId },
            through: { attributes: [] }
        }]
    })
    return userRoles
}

module.exports = { createUser, getUserRolesService }

