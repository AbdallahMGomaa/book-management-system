const express = require('express');


const {getBooks, getBookById, createBook, updateBook, deleteBook} = require('../controllers/books');
const { authenticateUser } = require('../middleware/authentication');
const { checkUserRole } = require('../middleware/permissions');

const router = express.Router()




router.get('/', checkUserRole(['borrower', 'admin']), getBooks)
router.get('/:id', checkUserRole(['borrower', 'admin']), getBookById)
router.post('/', checkUserRole(['admin']), createBook)
router.put('/:id', checkUserRole(['admin']), updateBook)
router.delete('/:id', checkUserRole(['admin']), deleteBook)


module.exports = router