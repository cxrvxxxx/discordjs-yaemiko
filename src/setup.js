import setupCommands from './setupCommands.js';
import setupDatabase from './setupDatabase.js';
import setupEventHandlers from './setupEventHandlers.js';

export default (client) => {
    setupCommands(client);
    setupDatabase(client);
    setupEventHandlers(client);
}
