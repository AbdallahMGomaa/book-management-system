const express = require('express');


const {getBooks, getBookById, createBook, updateBook, deleteBook} = require('../controllers/books');
const { authenticateUser } = require('../middleware/authentication');
const { checkUserRole } = require('../middleware/permissions');

const router = express.Router()




router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', authenticateUser, checkUserRole(['borrower']), createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)


module.exports = router