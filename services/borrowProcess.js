const {Book} = require("../models/books")
const { BorrowedBook } = require("../models/borrowProcess")
const { Borrower } = require("../models/borrowers")


async function checkAvailableBookQuantity(book) {
    const borrowedBooks = await BorrowedBook.findAll({
        where: {
            bookId: book.id,
            isReturned: false
        }
    })
    return book.available_quantity > borrowedBooks.length
}

async function borrowBookService(userId, bookId, checkQuantity) {
    const book = await Book.findByPk(bookId)
    if (!book) {
        throw new Error('book not found')
    }
    const borrower = await Borrower.findOne({where: {userId}})
    if (!await checkQuantity(book)) {
        throw new Error('book quantity is not available')
    }
    const currentTime = new Date()
    const dueTime = new Date(currentTime.getTime() + (7*24*60*60*1000))
    const borrowBook = await BorrowedBook.create({borrowedBy: borrower.id, bookId: book.id, dueDate: dueTime})
    return borrowBook
}

async function returnBookService(userId, borrowedBookId){
    const borrower = await Borrower.findOne({where: {userId: userId}})
    const borrowedBook = await BorrowedBook.findOne({where: {id: borrowedBookId, borrowedBy: borrower.id, isReturned: false}})
    if (borrowedBook) {
        borrowedBook.update({isReturned: true, returnedAt: new Date()})
    }
    else {
        throw new Error('book not borrowed or found')
    }
    return borrowedBook
}

async function getBorrowedBooksService(userId) {
    const borrower = await Borrower.findOne({where: {userId}})
    const borrowedBooks = await BorrowedBook.findAll({where: {borrowedBy: borrower.id, isReturned: false}})
    return borrowedBooks
}

module.exports = {checkAvailableBookQuantity, borrowBookService, returnBookService, getBorrowedBooksService}