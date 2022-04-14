const { Client } = require("pg");
require('dotenv').config();

const dbConnData = {
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST
};

const client = new Client(dbConnData);
client.connect().then(() => {
    console.log("Database connected")
});

module.exports = client;
