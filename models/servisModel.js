const client = require("../database/client.js");
async function getAll() 
{
    const queryRes = await client.query(
        `
            select servis.*, tip_servisa.naziv
            from servis 
            join tip_servisa on servis.tip_servisa_sifra=tip_servisa.sifra
        `
    );
    return queryRes.rows;
}
async function getById(data) 
{
    const queryRes = await client.query(
        `
            select *
            from servis
            where servis.sifra = $1
        `,
        [data.sifraServis]
    );

    return queryRes.rows[0];
}

async function getMultipleByVehicleIdWithDetails(data) 
{
    const queryRes = await client.query(
        `
            select servis.*, tip_servisa.naziv tip_servisa_naziv
            from servis
            join tip_servisa on servis.tip_servisa_sifra = tip_servisa.sifra
            where servis.vozilo_sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows;
}

async function create(data)
{
    const queryRes = await client.query(
        `
            insert into servis (datum, vozilo_sifra, tip_servisa_sifra)
            values ($1, $2, $3)
        `,
        [data.datum, data.vozilo_sifra, data.tip_sifra]
    );

    return queryRes.rowCount;
}

async function update(data) 
{
    const queryRes = await client.query(
        `
            update servis
            set datum = $2, tip_servisa_sifra = $3
            where servis.sifra = $1
        `,
        [data.sifraServis, data.datum, data.tip_sifra]
    );

    return queryRes.rowCount;
}

async function remove(data) 
{
    const queryRes = await client.query(
        `
            delete from servis
            where servis.sifra = $1
        `,
        [data.sifraServis]
    );

    return queryRes.rowCount;
}

module.exports = {
    getAll,
    getById,
    getMultipleByVehicleIdWithDetails,
    create,
    update,
    remove
};