const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelf_location: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Book