const client = require('./session');
const messageHandler = require('./messageHandler');

client.on('message', msg => messageHandler(msg, client));
