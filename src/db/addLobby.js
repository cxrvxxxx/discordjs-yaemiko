export const addLobby = async (db, guildId, channelId) => {
    await db.run(`
        INSERT INTO TB_LOBBY (FD_GUILD_ID, FD_CHANNEL_ID)
        VALUES (?,?)
    `, [guildId, channelId]);
}