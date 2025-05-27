// deploy-commands.js
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import commands from './commands/index.js';

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

const commandData = Array.from(commands.values()).map(cmd => cmd.data.toJSON());

try {
  console.log('Deploying slash commands...');

  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commandData }
  );

  // For global deployment (slow propagation, but permanent)
  // await rest.put(
  //   Routes.applicationCommands(process.env.CLIENT_ID),
  //   { body: commandData }
  // );

  console.log('Successfully deployed application commands!');
} catch (error) {
  console.error('Error deploying commands:', error);
}