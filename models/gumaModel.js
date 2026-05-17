const client = require("../database/client.js");

async function getAll() 
{
    const queryRes = await client.query(
        `
            select * from guma
        `
    );

    return queryRes.rows;
}

async function getByVehicleId(data) 
{
    const queryRes = await client.query(
        `
            select * from guma
            where guma.sifra = $1
        `,
        [data.guma_sifra]
    );

    return queryRes.rows[0];
}

async function getCustom(data)
{
    const queryRes = await client.query(
        `
            select ${data.func ? `${data.func}(${data.column})`: `DISTINCT ${data.column}`} from guma
        `
    );

    return queryRes.rows;
}

async function checkUse(data) 
{
    const queryRes = await client.query(
        `
            select 1 from vozilo
            where guma_sifra = $1
            limit 1
        `,
        [data.sifra]
    );

    return queryRes.rowCount > 0;
}

async function create(data) 
{
    let queryRes = await client.query(
        `
            insert into guma (naziv, sirina, omjer_visine_i_sirine, struktura, velicina_kotaca)
            values ($1, $2, $3, $4, $5)
        `,
        [data.naziv, data.sirina, data.omjer_visine_i_sirine, data.struktura, data.velicina_kotaca]
    );

    return queryRes.rowCount;
}

async function remove(data)
{
    const queryRes = await client.query(
        `
            delete from guma
            where guma.sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows;
}

module.exports = {
    getAll,
    getByVehicleId,
    getCustom,
    checkUse,
    create,
    remove
};