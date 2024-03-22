const {DataTypes} = require('sequelize')
const db = require('../db')
const { User } = require('./auth')

const Borrower = db.define('Borrower', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
})


module.exports = {Borrower}
