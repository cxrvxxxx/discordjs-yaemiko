import { getLobby } from '../db/getLobby.js';
import { deleteLobby } from '../db/deleteLobby.js';

export default async (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        if (oldState.channel && (!newState.channel || newState.channel.id !== oldState.channel.id)) {
            const channel = oldState.channel;
            const guild = oldState.guild;

            const lobbyData = await getLobby(client.db, guild.id, channel.id);
            if (!lobbyData.channelId) {
                return;
            }

            if (channel.members.size === 0) {
                try {
                    await channel.delete();
                    await deleteLobby(client.db, guild.id, channel.id);
                    console.log(`Deleted empty lobby: ${channel.name}`);
                } catch (err) {
                    console.error(`Failed to delete voice channel: ${channel.name}`, err);
                }
            }
        }
    });
}