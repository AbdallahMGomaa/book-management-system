const {Sequelize} = require('sequelize')

require('dotenv').config()



const sequelize = new Sequelize(process.env.DATABASE_URL)

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    })

module.exports = sequelize