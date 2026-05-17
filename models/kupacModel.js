const client = require("../database/client.js");

async function create(data) 
{
    let queryRes = await client.query(
        `
            insert into kupac (oib, ime, prezime, adresa)
            values ($1, $2, $3, $4)
        `,
        [data.oib, data.ime, data.prezime, data.adresa]
    );

    return queryRes.rowCount;
}

module.exports = {
    create
};