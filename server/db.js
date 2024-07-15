require('dotenv').config(); 

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const PORT = process.env.PORT
const DATABASE = process.env.DATABASE

const {Client} = require("pg");

const client = new Client({
    user : USER,
    password : PASSWORD,
    host : HOST,
    port : PORT,
    database : DATABASE
});

client.connect()
    .then(() => console.log("Connected to Postgresql Database successfully"))
    .catch(err => console.error('Connection error', err.stack));

module.exports = client;
