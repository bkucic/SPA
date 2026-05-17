require('dotenv').config({ quiet: true });
const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DB
});

client.connect();

module.exports = client;