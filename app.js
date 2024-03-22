const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')


const bookRouter = require('./routers/books')
const authRouter = require('./routers/auth')
const borrowersRouter = require('./routers/borrowers')
const borrowRouter = require('./routers/borrowProcess')
const reportsRouter = require('./routers/reports')

const { authenticateUser } = require('./middleware/authentication')
const {checkUserRole} = require('./middleware/permissions')
const config = require('./config')


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message: 'Too many requests, please try again later.'
})


// Middlewares
app.use(bodyParser.json())
app.use('/auth/register', limiter)
app.use('/auth/login', limiter)



// Routes
app.use('/books', authenticateUser, bookRouter)
app.use('/auth', authRouter)
app.use('/borrowers', borrowersRouter)
app.use('/borrow', authenticateUser, checkUserRole(['borrower']), borrowRouter)
app.use('/reports', authenticateUser, checkUserRole(['admin']), reportsRouter)



// Run server
const PORT = config.SERVER_PORT || 3000

app.listen(PORT, () => {
    console.log(`backend is listening on port ${PORT}`)
})