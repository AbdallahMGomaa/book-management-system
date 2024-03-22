const {Sequelize} = require('sequelize')
const config = require('./config')



const sequelize = new Sequelize(config.DATABASE_URL)

sequelize.sync()
    .then(() => {
        console.log('Database synchronized')
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err)
    })

module.exports = sequelize