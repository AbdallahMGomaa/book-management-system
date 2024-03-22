require('dotenv').config()

const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_PORT = process.env.POSTGRES_PORT
const POSTGRES_ADDRESS = process.env.POSTGRES_ADDRESS

const SERVER_PORT = process.env.SERVER_PORT

const SECRET_KEY = process.env.SECRET_KEY

const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_ADDRESS}:${POSTGRES_PORT}/${POSTGRES_DB}`

console.log(DATABASE_URL)

module.exports = {
    DATABASE_URL,
    SERVER_PORT,
    SECRET_KEY
}