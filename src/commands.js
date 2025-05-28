import { Collection } from 'discord.js';

// Import commands
import { data as pingData, execute as pingExecute } from './commands/ping.js';
import { execute, data as setvoicelobbyData, execute as setvoicelobbyExecute } from './commands/setVoiceLobby.js';

const commands = new Collection();

// Register commands
commands.set(pingData.name, { data: pingData, execute: pingExecute });
commands.set(setvoicelobbyData.name, { data: setvoicelobbyData, execute: setvoicelobbyExecute });

export default commands;
