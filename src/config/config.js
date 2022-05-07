import dotenv from 'dotenv';

dotenv.config();

const { DB, DB_USER, DB_HOST, DB_PASSWORD } = process.env;

export const dbConfig = {
    db: DB,
    dbUser: DB_USER,
    dbHost: DB_HOST,
    dbPassWord: DB_PASSWORD
}