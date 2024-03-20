const sequelize = require('../db')

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

module.exports = {getUserRolesService}

