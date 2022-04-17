import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT as string),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: parseInt(process.env.DB_PORT as string),
}
