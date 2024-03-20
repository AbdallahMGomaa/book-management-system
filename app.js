const express = require('express')
const app = express()

const bookRouter = require('./routers/books')
const authRouter = require('./routers/auth')
const borrowersRouter = require('./routers/borrowers')
const { authenticateUser } = require('./middleware/authentication')


require('dotenv').config()

// Middlewares

// Routes
app.use('/books', authenticateUser, bookRouter)
app.use('/auth', authRouter)
app.use('/borrowers', borrowersRouter)



// Run server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`backend is listening on port ${PORT}`)
})