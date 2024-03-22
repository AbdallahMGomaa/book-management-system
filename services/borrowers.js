const { UserRole, Role } = require("../models/auth")
const { Borrower } = require("../models/borrowers")
const { createUser } = require("./auth")



async function createBorrowerService(name, email, password, validateEmail, validatePassword) {
    const user = await createUser(email, password, validateEmail, validatePassword)
    const borrower = await Borrower.create({name, userId: user.id})
    const borrowerRole = await Role.findAll({where: {name: 'borrower'}})
    const userRole = await UserRole.create({userId: user.id, roleId: borrowerRole[0].id})
    return {user, borrower}
}

module.exports = {createBorrowerService}