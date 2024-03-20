const express = require('express')
const app = express()
const bookRouter = require('./routers/books')
require('dotenv').config()

// Middlewares

// Routes
app.use('/books', bookRouter)


// Run server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`backend is listening on port ${PORT}`)
})