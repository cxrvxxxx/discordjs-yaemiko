import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const generateTables = async (db) => {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS TB_LOBBY_SETTINGS (
            FD_GUILD_ID TEXT,
            FD_LOBBY_ID TEXT,
            FD_CATEGORY_ID TEXT,
            PRIMARY KEY (FD_GUILD_ID, FD_LOBBY_ID)
        );

        CREATE TABLE IF NOT EXISTS TB_LOBBY (
            FD_GUILD_ID TEXT,
            FD_CHANNEL_ID TEXT,
            PRIMARY KEY (FD_GUILD_ID, FD_CHANNEL_ID)
        );
    `, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }

        console.log('Tables created.');
    });
}

export default async (client) => {
    client.db = await open({
        filename: './data/appdata.db',
        driver: sqlite3.Database
    });

    generateTables(client.db);
}
