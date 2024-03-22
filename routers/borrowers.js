const express = require('express')

const {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower} = require('../controllers/borrowers')
const { checkUserRole } = require('../middleware/permissions')

const router = express.Router()


router.get('/', checkUserRole(['admin']), getBorrowers)
router.get('/:id', checkUserRole(['admin']), getBorrowerById)
router.post('/', checkUserRole(['borrower', 'admin']), createBorrower)
router.put('/:id', checkUserRole(['borrower', 'admin']), updateBorrower)
router.delete('/:id', checkUserRole(['admin']), deleteBorrower)


module.exports = router