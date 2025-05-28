import 'dotenv/config';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const getDbConnection = async () => {
    const db = await open({
        filename: './data/appdata.db',
        driver: sqlite3.Database
    })

    return db;
}