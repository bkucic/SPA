const client = require("../database/client.js");

async function getAll() 
{
    const queryRes = await client.query(
        `
            select *
            from rezervacija
        `
    );

    return queryRes.rows;
}

async function getMultipleByVehicleId(data) 
{
    const queryRes = await client.query(
        `
            select 1 from rezervacija
            where rezervacija.vozilo_sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows;
}

async function create(data) 
{
    let queryRes = await client.query(
        `
            insert into rezervacija (datum, vozilo_sifra, kupac_oib)
            values ($1, $2, $3)
        `,
        [data.datum, data.sifra, data.oib]
    );

    return queryRes.rowCount;
}

async function remove(data)
{
    const queryRes = await client.query(
        `
            delete from rezervacija
            where rezervacija.sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows;
}

module.exports = {
    getAll,
    getMultipleByVehicleId,
    create,
    remove
};