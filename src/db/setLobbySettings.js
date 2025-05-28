const getLobbySettings = async (db, guildId, lobbyId) => {

    const row  = await db.get(`
        SELECT
            FD_GUILD_ID AS guildId,
            FD_LOBBY_ID AS lobbyId,
            FD_CATEGORY_ID AS categoryId
        FROM
            TB_LOBBY_SETTINGS
        WHERE FD_GUILD_ID=? AND FD_LOBBY_ID=?
    `, [guildId, lobbyId]);

    if (!row) {
        return null;
    }

    return row;
}

const updateLobbySettings = async (db, guildId, lobbyId, categoryId) => {
    await db.run(`
       UPDATE TB_LOBBY_SETTINGS
       SET FD_CATEGORY_ID=?
       WHERE FD_GUILD_ID=? AND FD_LOBBY_ID=? 
    `, [categoryId, guildId, lobbyId]);
}

export const setLobbySettings = async (db, guildId, lobbyId, categoryId) => {
    const lobbySettings = await getLobbySettings(db, guildId, lobbyId );

    if (!lobbySettings) {
        await db.run(`
            INSERT INTO TB_LOBBY_SETTINGS (
            FD_GUILD_ID, FD_LOBBY_ID, FD_CATEGORY_ID
            ) VALUES (?,?,?)
        `, [guildId, lobbyId, categoryId]);
    } else {
        await updateLobbySettings(db, guildId, lobbyId, categoryId);
    }
}