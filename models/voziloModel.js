const client = require("../database/client.js");

async function getAll() {
    const queryRes = await client.query(
        `
            select * from vozilo
        `
    );

    return queryRes.rows;
}

async function getById(data) {
    const queryRes = await client.query(
        `
            select *
            from vozilo
            where vozilo.sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rows[0];
}

async function getMultipleById(data) {
    const queryRes = await client.query(
        `
            select *
            from vozilo
            where vozilo.sifra = ANY($1)
        `,
        [data.sifre]
    );

    return queryRes.rows;
}
async function getMultipleByIdWithDetails(data) {
    const queryRes = await client.query(
        `
            SELECT
                vozilo.sifra,
                vozilo.naziv,
                vozilo.boja,
                vozilo.oblik,

                motor.sifra AS motor_sifra,
                motor.naziv AS motor_naziv,
                motor.volumen,
                motor.broj_cilindara,
                motor.konfiguracija,

                guma.sifra AS guma_sifra,
                guma.naziv AS guma_naziv,
                guma.sirina,
                guma.omjer_visine_i_sirine,
                guma.struktura,
                guma.velicina_kotaca,

                marka.sifra AS marka_sifra,
                marka.naziv AS marka_naziv,

                EXISTS (
                    SELECT 1
                    FROM rezervacija
                    WHERE rezervacija.vozilo_sifra = vozilo.sifra
                ) AS rezervirano

            FROM vozilo

            JOIN motor
                ON motor.sifra = vozilo.motor_sifra

            JOIN guma
                ON guma.sifra = vozilo.guma_sifra

            JOIN marka
                ON marka.sifra = vozilo.marka_sifra

            WHERE vozilo.sifra = ANY($1)
        `,
        [data.sifre]
    );

    return queryRes.rows;
}
async function getAllWithDetails() {
    const queryRes = await client.query(
        `
            select
                vozilo.sifra, vozilo.naziv, vozilo.boja, vozilo.oblik,
                motor.sifra AS motor_sifra, motor.naziv AS motor_naziv,
                motor.volumen, motor.broj_cilindara, motor.konfiguracija,
                guma.sifra AS guma_sifra, guma.naziv AS guma_naziv,
                guma.sirina, guma.omjer_visine_i_sirine, guma.struktura, guma.velicina_kotaca,
                marka.sifra AS marka_sifra, marka.naziv AS marka_naziv
            from vozilo
            JOIN motor ON motor.sifra = vozilo.motor_sifra
            JOIN guma ON guma.sifra = vozilo.guma_sifra
            JOIN marka ON marka.sifra = vozilo.marka_sifra
        `
    );

    return queryRes.rows;
}

async function getFilteredWithDetails(filters) {
    const { boja, oblik, search, search_engine, minVolumen, maxVolumen, minCilindar, maxCilindar, minSirina, maxSirina, minOmjer, maxOmjer,
        minVelicina, maxVelicina, konfiguracija, search_tire, struktura } = filters;

    let query = `
        SELECT 
            vozilo.sifra, vozilo.naziv, vozilo.boja, vozilo.oblik,
            motor.sifra AS motor_sifra, motor.naziv AS motor_naziv,
            motor.volumen, motor.broj_cilindara, motor.konfiguracija,
            guma.sifra AS guma_sifra, guma.naziv AS guma_naziv,
            guma.sirina, guma.omjer_visine_i_sirine, guma.struktura, guma.velicina_kotaca,
            marka.sifra AS marka_sifra, marka.naziv AS marka_naziv,
            EXISTS (
                SELECT 1 
                FROM rezervacija
                WHERE rezervacija.vozilo_sifra = vozilo.sifra
            ) AS rezervirano
        FROM vozilo
        JOIN motor ON motor.sifra = vozilo.motor_sifra
        JOIN guma ON guma.sifra = vozilo.guma_sifra
        JOIN marka ON marka.sifra = vozilo.marka_sifra
        WHERE 1=1
    `;

    const params = [];

    function addArrayFilter(column, value) {
        if (value) {
            const values = Array.isArray(value) ? value : [value];
            params.push(values);
            query += ` AND ${column} = ANY($${params.length})`;
        }
    }

    function addRange(column, minValue, maxValue) {
        if (minValue && maxValue) {
            params.push(minValue, maxValue);
            query += ` AND ${column} BETWEEN $${params.length - 1} AND $${params.length}`;
        }
    }

    function addSearch(column, value) {
        if (value) {
            params.push(`%${value}%`);
            query += ` AND ${column} ILIKE $${params.length}`;
        }
    }

    addArrayFilter("vozilo.boja", boja);
    addArrayFilter("vozilo.oblik", oblik);
    addArrayFilter("motor.konfiguracija", konfiguracija);
    addArrayFilter("guma.struktura", struktura);

    addRange("motor.volumen", minVolumen, maxVolumen);
    addRange("motor.broj_cilindara", minCilindar, maxCilindar);
    addRange("guma.sirina", minSirina, maxSirina);
    addRange("guma.omjer_visine_i_sirine", minOmjer, maxOmjer);
    addRange("guma.velicina_kotaca", minVelicina, maxVelicina);

    addSearch("vozilo.naziv", search);
    addSearch("motor.naziv", search_engine);
    addSearch("guma.naziv", search_tire);

    const queryRes = await client.query(query, params);

    return queryRes.rows;
}

async function getCustom(data) {
    const queryRes = await client.query(
        `
            select ${data.func ? `${data.func}(${data.column})` : `DISTINCT ${data.column}`} from vozilo
        `
    );

    return queryRes.rows;
}

async function create(data) {
    const queryRes = await client.query(
        `
            insert into vozilo (naziv, boja, oblik, motor_sifra, guma_sifra, marka_sifra)
            values ($1, $2, $3, $4, $5, $6)
        `,
        [data.naziv, data.boja, data.oblik, data.motor_sifra, data.guma_sifra, data.marka_sifra]
    );

    return queryRes.rowCount;
}

async function update(data) {
    const queryRes = await client.query(
        `
            update vozilo
            set naziv = $2, boja = $3, oblik = $4, motor_sifra = $5, guma_sifra = $6, marka_sifra = $7
            where vozilo.sifra = $1
        `,
        [data.sifra, data.naziv, data.boja, data.oblik, data.motor_sifra, data.guma_sifra, data.marka_sifra]
    );

    return queryRes.rowCount;
}

async function remove(data) {
    await client.query(
        `delete from servis where servis.vozilo_sifra = $1`,
        [data.sifra]
    );
    await client.query(
        `delete from rezervacija where rezervacija.vozilo_sifra = $1`,
        [data.sifra]
    );
    const queryRes = await client.query(
        `
            delete from vozilo
            where vozilo.sifra = $1
        `,
        [data.sifra]
    );

    return queryRes.rowCount;
}

module.exports = {
    getAll,
    getById,
    getMultipleById,
    getMultipleByIdWithDetails,
    getAllWithDetails,
    getFilteredWithDetails,
    getCustom,
    create,
    update,
    remove
};