const sequelize = require('../db')
const { User } = require('../models/auth')
const {validateEmail, validatePassword} = require('../validators/auth')
const bcrypt = require('bcryptjs')


async function createUser(email, password) {
    if (!validateEmail(email)) {
        throw new Error('invalid email')
    }
    if (!validatePassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    }
    const hashedPassword = await bcrypt.hash(password, 15)
    const user = await User.create({email, password: hashedPassword})
    return user
}

async function getUserRolesService(userId) {
    const userRoles = await sequelize.query(
        `
        SELECT r.id, r.name
        FROM "Users" u
        INNER JOIN "UserRoles" ur ON u.id = ur."userId"
        INNER JOIN "Roles" r ON ur."roleId" = r.id
        WHERE u.id = :userId
        `,
        {replacements: {userId}, type: sequelize.QueryTypes.SELECT}
    )
    return userRoles
}

module.exports = {createUser, getUserRolesService}

