export default (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.warn(`No command matching ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(`Error executing /${interaction.commandName}:`, error);
            if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
            } else {
            await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
            }
        }
    });
}