const Client = require('./Structures/Client')
const client = new Client()
const config = require('./config')


client.start(config.token)