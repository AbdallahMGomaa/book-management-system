const express = require('express');
const bodyParser = require('body-parser');
const url = require('url')
const querystring = require('querystring')

const {getBooks, getBookById, createBook, updateBook, deleteBook} = require('../controllers/books')

const router = express.Router()


router.use(bodyParser.json())


router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)


module.exports = router