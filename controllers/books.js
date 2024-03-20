const Book = require("../models/books");


async function getBooks(request, response) {
    try {
        const query = request.query
        const books = await Book.findAll({
            where: query
        });
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function getBookById(request, response) {
    try {
        const bookId = request.params.id;
        const book = await Book.findByPk(bookId);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json({ error: "book not found" });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function createBook(request, response) {
    try {
        const newBook = await Book.create(request.body);
        response.status(200).json(newBook);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
}

async function updateBook(request, response) {
    try {
        const bookId = request.params.id;
        const book = await Book.findByPk(bookId);
        if (book) {
            await book.update(request.body);
            response.status(200).json(book);
        } else {
            response.status(404).json({ error: "book not found" });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function deleteBook(request, response) {
    try {
        const bookId = request.params.id;
        const book = await Book.findByPk(bookId);
        if (book) {
            await book.destroy()
            response.status(200).json({ message: 'book deleted successfully' })
        }
        else {
            response.status(404).json({ error: 'book not found' })
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}


module.exports =  {getBooks, getBookById, createBook, updateBook, deleteBook}