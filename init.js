const {User, Role,UserRole } = require('./models/auth')
const { Book } = require('./models/books')
const { createUser } = require('./services/auth')
const { createBorrowerService } = require('./services/borrowers')
const { validateEmail, validatePassword } = require('./validators/auth')
async function initData () {
    Role.create({id: 1, name: 'admin'})
    Role.create({id: 2, name: 'borrower'})

    const admin = await createUser('admin@admin.com', 'Admin123&', validateEmail, validatePassword)
    const borrower = await createBorrowerService('borrower', 'borrower@borrower.com', 'Borrower123&', validateEmail, validatePassword)

    UserRole.create({userId: admin.id, roleId: 1})
    UserRole.create({userId: borrower.id, roleId: 2})

    for (let i = 0; i < 10; i++) {
        Book.create({title: 'title '+i, author: 'author '+i, ISBN: 'isbn '+i, available_quantity: 1, shelf_location: 'location '+i})
    }
}

initData()