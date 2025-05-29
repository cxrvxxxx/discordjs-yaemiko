export const getLobby = async (db, guildId, channelId) => {
    const row  = await db.get(`
        SELECT
            FD_GUILD_ID AS guildId,
            FD_CHANNEL_ID as channelId
        FROM
            TB_LOBBY
        WHERE FD_GUILD_ID=? AND FD_CHANNEL_ID=?
    `, [guildId, channelId]);

    if (!row) {
        return { guildId: null, channelId: null};
    }

    return row;
}