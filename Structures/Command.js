const Discord = require('discord.js')
const Client = require('./Client')

/**
 * 
 * @param {Client} client 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {string[]} args 
 */

function RunFunction(client, message, args) {}

class Command {
    /**
     * @typedef {{name: string, description: string, run: RunFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = Command