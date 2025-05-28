import { SlashCommandBuilder } from "discord.js";
import { getDbConnection } from '../db/getDbConnection.js';
import { setLobbySettings } from '../db/setLobbySettings.js';

export const data = new SlashCommandBuilder()
    .setName('setvoicelobby')
    .setDescription('Make a channel a voice channel lobby.')
    .addStringOption(option =>
        option.setName('lobby_id')
            .setDescription('The Channel ID of the lobby channel.')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('category_id')
            .setDescription('The Channel ID of the Category where voice channels will be created.')
            .setRequired(true)
    )

export const execute = async (interaction) => {
    const member = interaction.member;

    if (!member.permissions.has('Administrator')) {
        interaction.reply('You are not authorized to perform this action!');
        return;
    }

    const GUILD_ID = interaction.guild.id;

    const LOBBY_ID = interaction.options.getString('lobby_id');
    const lobby = await interaction.guild.channels.fetch(LOBBY_ID);
    if (!lobby) {
        await interaction.reply('Could not find lobby channel.');
        return;
    }

    const CATEGORY_ID = interaction.options.getString('category_id');
    const category = await interaction.guild.channels.fetch(CATEGORY_ID);
    if (!category) {
        await interaction.reply('Could not find category.');
        return;
    }

    const db = await getDbConnection();
    await setLobbySettings(db, GUILD_ID, LOBBY_ID, CATEGORY_ID);

    await interaction.reply(`[**${lobby.name}**] has been set as the lobby for [**${category.name}**].`);
}