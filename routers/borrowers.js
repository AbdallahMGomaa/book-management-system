const express = require('express');
const bodyParser = require('body-parser');

const {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower} = require('../controllers/borrowers');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router()

router.use(bodyParser.json())

router.get('/', authenticateUser, getBorrowers)
router.get('/:id', authenticateUser, getBorrowerById)
router.post('/', createBorrower)
router.put('/:id', authenticateUser, updateBorrower)
router.delete('/:id', authenticateUser, deleteBorrower)


module.exports = router