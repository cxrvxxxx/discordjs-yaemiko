import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import commands from './commands/index.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = commands;

client.once('ready', () => {
    console.log(`Connected as ${client.user?.tag}.`);
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.warn(`No command matching ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing /${interaction.commandName}:`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
    }
  }
});

const { TOKEN } = process.env;
client.login(TOKEN);
