const client = require("../database/client.js");

async function getById(data) 
{
    const queryRes = await client.query(
        `
            select *
            from administrator
            where korisnicko_ime = $1
        `,
        [data.username]
    );

    return queryRes.rows[0];
}

module.exports = {
    getById
};