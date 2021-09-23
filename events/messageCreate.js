const Event = require("../Structures/Event");

module.exports = new Event('messageCreate', (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.substring(client.prefix.length).split(/ +/g)
    const command = client.commands.find(cmd => cmd.name == args[0])
    if (!command) return;
    command.run(client, message, args)
})