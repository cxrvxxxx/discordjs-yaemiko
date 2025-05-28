import { getDbConnection } from './getDbConnection.js';

export const createTables = async () => {
    const db = await getDbConnection();

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