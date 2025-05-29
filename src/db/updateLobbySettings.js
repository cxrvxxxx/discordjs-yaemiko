export const updateLobbySettings = async (db, guildId, lobbyId, categoryId) => {
    await db.run(`
       UPDATE TB_LOBBY_SETTINGS
       SET FD_CATEGORY_ID=?
       WHERE FD_GUILD_ID=? AND FD_LOBBY_ID=? 
    `, [categoryId, guildId, lobbyId]);
}