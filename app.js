const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const bookRouter = require('./routers/books')
const authRouter = require('./routers/auth')
const borrowersRouter = require('./routers/borrowers')
const borrowRouter = require('./routers/borrowProcess')
const { authenticateUser } = require('./middleware/authentication')
const {checkUserRole} = require('./middleware/permissions')


require('dotenv').config()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/books', authenticateUser, bookRouter)
app.use('/auth', authRouter)
app.use('/borrowers', borrowersRouter)
app.use('/borrow', authenticateUser, checkUserRole(['borrower']), borrowRouter)



// Run server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`backend is listening on port ${PORT}`)
})