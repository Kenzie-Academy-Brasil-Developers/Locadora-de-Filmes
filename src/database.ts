import { Client } from "pg";

const client: Client = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '1234',
    database: 'postgres'
})

const startDatabase = async (): Promise<void> => {
    await client.connect()
    console.log('Database connected')
}

export { startDatabase, client }