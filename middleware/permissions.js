const {getUserRolesService} = require('../services/auth')

function checkUserRole(roleNames) {
    return async (request, response, next) => {
        const user = request.user
        const userRoles = await getUserRolesService(user.id)
        var isAuthorized = false
        for (let role of userRoles) {
            if (roleNames.includes(role.name)) {
                isAuthorized = true
                break
            }
        }
        if (isAuthorized) {
            request.user.roles = userRoles
            next()
        }
        else {
            return response.status(403).json({message: 'access denied'})
        }
    }
}



module.exports = {checkUserRole}