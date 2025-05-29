export default async (client) => {
    client.once('ready', () => {
        console.log(`Connected as ${client.user?.tag}.`);
    });
}