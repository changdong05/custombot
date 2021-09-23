const Discord = require('discord.js');
const intents = new Discord.Intents(32767);
const Command = require("./Command");
const fs = require('fs')
const Event = require('./Event')
const config = require('../config')
class Client extends Discord.Client {
    constructor() {
        super({ intents });

        /**
         * @type {Discord.Collection<string, Command>}
         */

        this.commands = new Discord.Collection()
    }

    start(token) {
    fs.readdirSync("./commands")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            /**
            * @type {Command}
            */
            const command = require(`../commands/${file}`)

            this.commands.set(command.name, command);

            this.prefix = config.prefix
        });

        fs.readdirSync("./events")
        .filter(file => file.endsWith(".js"))
        .forEach(file => {
            /**
             * @type {Event}
             */
            const event = require(`../events/${file}`);
            this.on(event.event, event.run.bind(null, this))
        })

        this.login(token)
    }
}

module.exports = Client;
