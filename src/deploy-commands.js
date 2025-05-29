import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = (await readdir(commandsPath)).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(`file://${filePath}`);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] The command at ${file} is missing "data" or "execute".`);
  }
}

const rest = new REST().setToken(process.env.TOKEN);

try {
  console.log(`Refreshing ${commands.length} application (slash) commands...`);

  const data = await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );

  console.log(`Successfully reloaded ${data.length} commands.`);
} catch (error) {
  console.error('Error deploying commands:', error);
}