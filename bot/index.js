const client = require('./session');
const messageHandler = require('./messageHandler');

client.on('message', msg => messageHandler(msg, client));

client.on('ready', () => {
    console.log('✅ Cliente listo');
    client.on('message', (msg) => {
        if (!msg?.key?.remoteJid) return;
        require('./messageHandler')(msg);
    });
});

module.exports = client;