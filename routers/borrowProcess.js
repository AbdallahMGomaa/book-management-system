const express = require('express')

const { checkoutBook, returnBook, checkBorrowedBooks } = require('../controllers/borrowProcess')

const router = express.Router()


router.post('/checkout', checkoutBook)
router.post('/return', returnBook)
router.get('/borrowed', checkBorrowedBooks)


module.exports = router