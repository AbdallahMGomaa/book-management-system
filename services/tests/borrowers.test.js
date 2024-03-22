const { createBorrowerService } = require('../borrowers')
const { createUser } = require('../auth')
const { Role, UserRole } = require('../../models/auth')
const { Borrower } = require("../../models/borrowers")


jest.mock('../auth', () => ({
    createUser: jest.fn(),
}))

// jest.mock('../borrowers', () => ({
//     createBorrowerService: jest.fn(),
// }))

jest.mock('../../models/auth', () => ({
    Role: {
        findAll: jest.fn(),
    },
    UserRole: {
        create: jest.fn(),
    },
}))

jest.mock('../../models/borrowers', () => ({
    Borrower: {
        create: jest.fn(),
    }
}))

describe('createBorrowerService', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('creates a new borrower with user and borrower role', async () => {
        // Mock user data
        const name = 'John Doe'
        const email = 'john@example.com'
        const password = 'Test123!'
        const user = { id: 1, email }
        const borrower = { id: 1, name, userId: user.id }
        const borrowerRole = { id: 2, name: 'borrower' }


        const validateEmail = jest.fn(() => true)
        const validatePassword = jest.fn(() => true)

        createUser.mockResolvedValue(user)

        Borrower.create.mockResolvedValue(borrower)
        Role.findAll.mockResolvedValue([borrowerRole])
        UserRole.create.mockResolvedValue({})

        const result = await createBorrowerService(name, email, password, validateEmail, validatePassword)

        expect(result.user).toEqual(user)
        expect(result.borrower).toEqual(borrower)
        expect(createUser).toHaveBeenCalledWith(email, password, validateEmail, validatePassword)
        expect(Borrower.create).toHaveBeenCalledWith({ name, userId: user.id })
        expect(Role.findAll).toHaveBeenCalledWith({ where: { name: 'borrower' } })
        expect(UserRole.create).toHaveBeenCalledWith({ userId: user.id, roleId: borrowerRole.id })
    })
})


