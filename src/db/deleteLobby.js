export const deleteLobby = async (db, guildId, channelId) => {
    await db.run(`
       DELETE FROM TB_LOBBY
       WHERE FD_GUILD_ID=? AND FD_CHANNEL_ID=? 
    `, [guildId, channelId]);
}