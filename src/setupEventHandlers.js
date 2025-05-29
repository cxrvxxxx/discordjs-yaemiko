import { Collection } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client) => {
    const eventFiles = await readdir(path.join(__dirname, './events'));

    for (const file of eventFiles) {
        if (!file.endsWith('.js')) {
            continue;
        }

        const filePath = path.join(__dirname, './events', file);
        const eventModule = await import(`file://${filePath}`);

        eventModule.default(client);
    }
}
