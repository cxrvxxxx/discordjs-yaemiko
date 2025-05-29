export const getLobbySettings = async (db, guildId, lobbyId) => {
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