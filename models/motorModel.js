const client = require("../database/client.js");

async function getAll() 
{
    const queryRes = await client.query(
        `
            select * from motor
        `
    );

    return queryRes.rows;
}

async function getByVehicleId(data) 
{
    const queryRes = await client.query(
        `
            select * from motor
            where motor.sifra = $1
        `,
        [data.motor_sifra]
    );

    return queryRes.rows[0];
}

async function getCustom(data)
{
    const queryRes = await client.query(
        `
            select ${data.func ? `${data.func}(${data.column})`: `DISTINCT ${data.column}`} from motor
        `
    );

    return queryRes.rows;
}

async function checkUse(data) 
{
    const queryRes = await client.query(
        `
            select 1 from vozilo
            where motor_sifra = $1
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
            insert into motor (naziv, volumen, broj_cilindara, konfiguracija)
            values ($1, $2, $3, $4)
        `,
        [data.naziv, data.volumen, data.broj_cilindara, data.konfiguracija]
    );

    return queryRes.rowCount;
}

async function remove(data)
{
    const queryRes = await client.query(
        `
            delete from motor
            where motor.sifra = $1
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