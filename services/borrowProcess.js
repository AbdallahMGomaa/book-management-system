const Book = require("../models/books");
const { BorrowedBook } = require("../models/borrowProcess");

async function borrowBookService(userId, bookId) {
    const book = await Book.findOne({where: {id: bookId}})
    const currentTime = new Date()
    const dueTime = new Date(currentTime.getTime() + (7*24*60*60*1000))
    const borrowBook = await BorrowedBook.create({borrowedBy: userId, bookId, dueDate: dueTime})
    return borrowBook
}

async function returnBookService(userId, borrowedBookId){
    const borrowedBook = await BorrowedBook.findByPk(borrowedBookId)
    if (borrowedBook) {
        borrowedBook.update({isReturned: true, returnedAt: new Date()})
    }
    else {
        throw new Error('book not borrowed or found')
    }
    return borrowedBook

}

async function getBorrowedBooksService(userId) {
    const borrowedBooks = await BorrowedBook.findAll({where: {borrowedBy: userId, isReturned: false}})
    return borrowedBooks
}

module.exports = {borrowBookService, returnBookService, getBorrowedBooksService}