const express = require('express')

const {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower} = require('../controllers/borrowers')
const { checkUserRole } = require('../middleware/permissions')
const { authenticateUser } = require('../middleware/authentication')

const router = express.Router()


router.get('/', authenticateUser, checkUserRole(['admin']), getBorrowers)
router.get('/:id', authenticateUser, checkUserRole(['admin']), getBorrowerById)
router.post('/', createBorrower)
router.put('/:id', authenticateUser, checkUserRole(['borrower', 'admin']), updateBorrower)
router.delete('/:id', authenticateUser, checkUserRole(['admin']), deleteBorrower)


module.exports = router