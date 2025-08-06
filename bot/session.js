const { Client, LocalAuth } = require('whatsapp-web.js');
const messageHandler = require('./messageHandler');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => require('qrcode-terminal').generate(qr, { small: true }));
client.on('ready', () => console.log('✅ Bot conectado!'));
client.on('message', msg => messageHandler(msg, client));

client.initialize();

module.exports = client;
