import { Pool } from 'pg';
import { config } from './config/config';

export const pool = new Pool({
    host: config.dbHost,
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword,
    port: config.dbPort
});