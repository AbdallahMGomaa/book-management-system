const {DataTypes} = require('sequelize')
const db = require('../db')

const User = db.define('User', 
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        indexes: [
            {
            unique: true,
            fields: ['email'],
            },
        ],
    }
)

const Role = db.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

const UserRole = db.define('UserRole', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    }
})

module.exports = {User, Role, UserRole}


