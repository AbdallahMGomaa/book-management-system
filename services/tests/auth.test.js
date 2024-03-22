const { User } = require('../../models/auth')
const { createUser, getUserRolesService } = require('../auth')
const bcrypt = require('bcryptjs')


jest.mock('../../models/auth', () => ({
	User: {
		create: jest.fn(),
	}
}))

jest.mock('bcryptjs', () => ({
	hash: jest.fn(),
}))

describe('createUser', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('creates a new user if email and password are valid', async () => {
		const email = 'test@example.com'
		const password = 'Test123!'
		const hashedPassword = 'hashedPassword'
		const user = { id: 1, email, password: hashedPassword }

		const validateEmail = jest.fn(() => true)
		const validatePassword = jest.fn(() => true)

		bcrypt.hash.mockResolvedValue(hashedPassword)
		User.create.mockResolvedValue(user)

		const result = await createUser(email, password, validateEmail, validatePassword)

		expect(result).toEqual(user)
		expect(validateEmail).toHaveBeenCalledWith(email)
		expect(validatePassword).toHaveBeenCalledWith(password)
		expect(bcrypt.hash).toHaveBeenCalledWith(password, 15)
		expect(User.create).toHaveBeenCalledWith({ email, password: hashedPassword })
	})

	test('throws an error if email is invalid', async () => {
		const email = 'invalidEmail'
		const password = 'Test123!'

		const validateEmail = jest.fn(() => false)
		const validatePassword = jest.fn(() => true)

		await expect(createUser(email, password, validateEmail, validatePassword)).rejects.toThrow('invalid email')
	})

	test('throws an error if password is invalid', async () => {
		const email = 'test@example.com'
		const password = 'invalidPassword'

		const validateEmail = jest.fn(() => true)
		const validatePassword = jest.fn(() => false)

		await expect(createUser(email, password, validateEmail, validatePassword)).rejects.toThrow('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
	})
})

