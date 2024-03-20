const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:password@localhost:5442/book_management_system')

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    })

module.exports = sequelize