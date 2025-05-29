import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import setup from './setup.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

setup(client);

const { TOKEN } = process.env;
client.login(TOKEN);
