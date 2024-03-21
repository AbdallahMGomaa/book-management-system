const {DataTypes} = require('sequelize')
const db = require('../db')
const { Borrower } = require('./borrowers')
const Book = require('./books')

const BorrowedBook = db.define('BorrowedBook', {
    borrowedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Borrower,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNAuthorull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = {BorrowedBook}