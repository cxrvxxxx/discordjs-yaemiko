import { Collection } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client) => {
    client.commands = new Collection();

    const commandFiles = await readdir(path.join(__dirname, './commands'));

    for (const file of commandFiles) {
        if (!file.endsWith('.js')) {
            continue;
        }

        const filePath = path.join(__dirname, './commands', file);
        const commandModule = await import(`file://${filePath}`);

        commandModule.default(client);
    }
}
