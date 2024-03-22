const { Book } = require('../../models/books')
const { BorrowedBook } = require('../../models/borrowProcess')
const { Borrower } = require('../../models/borrowers')
const { borrowBookService, checkAvailableBookQuantity, returnBookService, getBorrowedBooksService } = require('../borrowProcess')

jest.mock('../../models/books', () => ({
    Book: {
        findByPk: jest.fn(),
        create: jest.fn(),
    }
}))

jest.mock('../../models/borrowers', () => ({
    Borrower: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
    }
}))

jest.mock('../../models/borrowProcess', () => ({
    BorrowedBook: {
        create: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
    }
}))



describe('borrowBookService', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('a borrower borrows a book when there is enough available books', async () => {
        const borrower = { id: 1, name: 'John Doe', userId: 1 }
        const book = { id: 1, title: 'title', author: 'author', ISBN: 'isbn', available_quantity: 1, shelf_location: 'there' }
        const borrowedBook = { borrowedBy: borrower.id, bookId: book.id, isReturned: false, returnedAt: null, dueDate: new Date() }
        const checkAvailableBookQuantityMock = jest.fn(() => true)

        Book.findByPk.mockResolvedValue(book)
        Borrower.findByPk.mockResolvedValue(borrower)
        BorrowedBook.create.mockResolvedValue(borrowedBook)

        const result = await borrowBookService(borrower.id, book.id, checkAvailableBookQuantityMock)

        expect(result).toEqual(borrowedBook)
        expect(checkAvailableBookQuantityMock).toHaveBeenCalledWith(book)
        expect(Book.findByPk).toHaveBeenCalledWith(book.id)
        expect(Borrower.findByPk).toHaveBeenCalledWith(borrower.id)
    })

    test('a borrower borrows a book when there is no available books', async () => {
        const borrower = { id: 1, name: 'John Doe', userId: 1 }
        const book = { id: 1, title: 'title', author: 'author', ISBN: 'isbn', available_quantity: 1, shelf_location: 'there' }
        const borrowedBook = { borrowedBy: borrower.id, bookId: book.id, isReturned: false, returnedAt: null, dueDate: new Date() }
        const checkAvailableBookQuantityMock = jest.fn(() => false)

        Book.findByPk.mockResolvedValue(book)
        Borrower.findByPk.mockResolvedValue(borrower)
        BorrowedBook.create.mockResolvedValue(borrowedBook)

        expect(borrowBookService(borrower.id, book.id, checkAvailableBookQuantityMock)).rejects.toThrow('book quantity is not available')
    })
})

describe('returnBookService', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('a borrower returns a book', async () => {
        const userId = 1
        const borrowedBookId = 1
        const borrower = { id: 1 }
        const borrowedBook = { id: 1, borrowedBy: borrower.id, update: jest.fn() }

        BorrowedBook.findOne.mockResolvedValue(borrowedBook)
        Borrower.findOne.mockResolvedValue(borrower)

        const result = await returnBookService(userId, borrowedBook.id)

        expect(result).toEqual(borrowedBook)
        expect(Borrower.findOne).toHaveBeenCalledWith({ where: { userId } })
        expect(BorrowedBook.findOne).toHaveBeenCalledWith({ where: { id: borrowedBookId, borrowedBy: borrower.id } })
        expect(borrowedBook.update).toHaveBeenCalledWith({ isReturned: true, returnedAt: expect.any(Date) })
    })

    test('throws an error if book not found', async () => {
        const userId = 1
        const borrowedBookId = 1
        const borrower = { id: 1 }

        Borrower.findOne.mockResolvedValue(borrower)
        BorrowedBook.findOne.mockResolvedValue(null)
        await expect(returnBookService(userId, borrowedBookId)).rejects.toThrow('book not borrowed or found')
    })
})

describe('getBorrowedBokService', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('get all borrowed books', async () => {
        const userId = 1
        const borrowedBooks = [{id: 1}, {id: 2}, {id: 3}]

        BorrowedBook.findAll.mockResolvedValue(borrowedBooks)

        const result = await getBorrowedBooksService(userId)
        
        expect(result).toEqual(borrowedBooks)
    })
})