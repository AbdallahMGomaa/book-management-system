const { borrowBookService, returnBookService, getBorrowedBooksService } = require("../services/borrowProcess")


async function checkoutBook(request, response) {
    try {
        const user = request.user
        const {bookId} = request.body
        const borrowBook = await borrowBookService(user.id, bookId)
        response.status(200).json({borrowBook})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

async function returnBook(request, response) {
    try {
        const user = request.user
        const {borrowedBook} = request.body
        const returnedBook = await returnBookService(user.id, borrowedBook)
        response.status(200).json({returnedBook})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

async function checkBorrowedBooks(request, response) {
    try {
        const user = request.user
        const borrowedBooks = await getBorrowedBooksService(user.id)
        response.status(200).json({borrowedBooks})
    }
    catch (error) {
        response.status(400).json({error: error.message})
    }
}

module.exports = {checkoutBook, returnBook, checkBorrowedBooks}