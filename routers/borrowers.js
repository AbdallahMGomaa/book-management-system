const express = require('express');

const {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower} = require('../controllers/borrowers');
const { authenticateUser } = require('../middleware/authentication');
const { checkUserRole } = require('../middleware/permissions');

const router = express.Router()


router.get('/', authenticateUser, checkUserRole(['borrower']), getBorrowers)
router.get('/:id', authenticateUser, getBorrowerById)
router.post('/', createBorrower)
router.put('/:id', authenticateUser, updateBorrower)
router.delete('/:id', authenticateUser, deleteBorrower)


module.exports = router