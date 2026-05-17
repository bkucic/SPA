const client = require("../database/client.js");

async function getAll() 
{
    const queryRes = await client.query(
        `
            select * from marka
        `
    );

    return queryRes.rows;
}

async function getCustom(data)
{
    const queryRes = await client.query(
        `
            select ${data.func ? `${data.func}(${data.column})`: `DISTINCT ${data.column}`} from marka
        `
    );

    return queryRes.rows;
}

async function create(data) 
{
    let queryRes = await client.query(
        `
            insert into marka (naziv)
            values ($1)
        `,
        [data.naziv]
    );

    return queryRes.rowCount;
}

async function checkUse(data) 
{
    const queryRes = await client.query(
        `
            select 1 from vozilo
            where marka_sifra = $1
            limit 1
        `,
        [data.sifra]
    );

    return queryRes.rowCount > 0;
}
async function remove(data)
{
    const queryRes = await client.query(
        `
            delete from marka
            where marka.sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows;
}


module.exports = {
    getAll,
    getCustom,
    create,
    checkUse,
    remove
};