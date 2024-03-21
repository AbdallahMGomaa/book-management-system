const express = require('express');
const { getAllBorrowedLastMonth, getOverdueBorrowedLastMonth, getBorrowedFiltered } = require('../controllers/reports');


const router = express.Router()


router.get('/borrowing_process', getBorrowedFiltered)
router.get('/last_month_borrowed', getAllBorrowedLastMonth)
router.get('/last_month_overdue', getOverdueBorrowedLastMonth)


module.exports = router
