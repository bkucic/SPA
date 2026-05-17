const client = require("../database/client.js");

async function getAll() 
{
    const queryRes = await client.query(
        `
            select * from tip_servisa
        `
    );

    return queryRes.rows;
}

module.exports = {
    getAll
};