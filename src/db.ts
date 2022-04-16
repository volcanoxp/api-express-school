import { Pool } from 'pg';

export const pool = new Pool({
    host: "localhost",
    database: "school",
    user: "postgres",
    password: "4gt.TcE.322",
    port: 5436
});