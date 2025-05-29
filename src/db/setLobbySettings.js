import { getLobbySettings } from './getLobbySettings.js';
import { updateLobbySettings } from './updateLobbySettings.js';

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