import { ChannelType } from 'discord.js';
import { getLobbySettings } from '../db/getLobbySettings.js';
import { addLobby } from '../db/addLobby.js';

export default async (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        if (!oldState.channel && newState.channel) {
            const guild = newState.guild;
            const channel = newState.channel;
            const member = newState.member;

            const { categoryId } = await getLobbySettings(client.db, guild.id, channel.id);
            if (!categoryId) {
                return;
            }

            const category = await guild.channels.fetch(categoryId);
            if (!category) {
                console.log('Could not find category.');
                return;
            }

            guild.channels.create({
                name: `🎮 ${member.user.displayName}'s Lobby`,
                type: ChannelType.GuildVoice,
                parent: category.id
            })
            .then(channel => {
                console.log(`Created voice channel: ${channel.name}`);
                member.voice.setChannel(channel.id)
                    .then(async () => {
                        console.log(`Moved ${member.user.displayName} to ${channel.name}.`);
                        await addLobby(client.db, guild.id, channel.id);
                    })
                    .catch(console.error);
            })
            .catch(console.error);
        }
    });
}