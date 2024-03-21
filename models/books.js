const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Book = sequelize.define('Book', 
    {
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
        },
    },
    {
        indexes: [
            {
                unique: false,
                fields: ['title'],
            },
            {
            unique: true,
            fields: ['ISBN'],
            },
            {
                unique: false,
                fields: ['shelf_location'],
            },
        ],
    }
);

module.exports = Book