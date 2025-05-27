import { Collection } from 'discord.js';

// Import commands
import { data as pingData, execute as pingExecute } from './ping.js';

const commands = new Collection();

// Register commands
commands.set(pingData.name, { data: pingData, execute: pingExecute });

export default commands;
