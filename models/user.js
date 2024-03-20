const {DataTypes} = require('Sequelize')
const db = require('../db')

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = User