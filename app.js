const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const bookRouter = require('./routers/books')
const authRouter = require('./routers/auth')
const borrowersRouter = require('./routers/borrowers')
const borrowRouter = require('./routers/borrowProcess')
const reportsRouter = require('./routers/reports')

const { authenticateUser } = require('./middleware/authentication')
const {checkUserRole} = require('./middleware/permissions')
const config = require('./config')



// Middlewares
app.use(bodyParser.json())

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