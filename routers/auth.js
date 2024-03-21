const express = require('express');

const {registerUser, loginUser, getUserRoles} = require('../controllers/auth');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/roles', authenticateUser, getUserRoles)


module.exports = router