const express = require('express');
const bodyParser = require('body-parser');

const {registerUser, loginUser, getUserRoles} = require('../controllers/auth');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router()

router.use(bodyParser.json())

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/roles', authenticateUser, getUserRoles)


module.exports = router