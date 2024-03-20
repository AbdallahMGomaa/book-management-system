const express = require('express');
const bodyParser = require('body-parser');

const {getBorrowers, getBorrowerById, createBorrower, updateBorrower, deleteBorrower} = require('../controllers/borrowers')

const router = express.Router()

router.use(bodyParser.json())

router.get('/', getBorrowers)
router.get('/:id', getBorrowerById)
router.post('/', createBorrower)
router.put('/:id', updateBorrower)
router.delete('/:id', deleteBorrower)


module.exports = router