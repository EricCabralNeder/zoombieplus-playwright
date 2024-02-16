const {Pool} = require('pg')

const DbConfig = {
    user: 'tznqgclo',
    host: 'tyke.db.elephantsql.com',
    database: 'tznqgclo',
    password: 'DGyg1iJKVa2nlK9ujlCkG8zVMlxN1IVv',
    port: 5432
}

export async function executeSQL(sqlScript) {

    try {
        const pool = new Pool(DbConfig)
        const Client = await pool.connect()

        const result = await Client.query(sqlScript)
        console.log(result.rows)

    } catch(error) {
        console.log('Error ao executar SQL: ' + error)

    }
}