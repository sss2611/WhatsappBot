const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageHandler = require('./messageHandler');

const client = new Client({
    authStrategy: new LocalAuth()
});

// 🔁 Mostrar el QR en consola
client.on('qr', qr => qrcode.generate(qr, { small: true }));

// ✅ Confirmación cuando el bot está listo
client.on('ready', () => {
    console.log('✅ Bot conectado y listo');
    console.log('👤 Plataforma:', client.info?.platform || 'Desconocida');
    console.log('📱 Número conectado:', client.info?.wid?.user || 'No disponible');
});

// 🔐 Manejo de errores de autenticación
client.on('auth_failure', msg => {
    console.error('🔒 Error de autenticación:', msg);
});

// 📴 Evento si el bot se desconecta
client.on('disconnected', reason => {
    console.warn('⚠️ Bot desconectado. Motivo:', reason);
});

// 🧠 Manejo de mensajes entrantes vía módulo externo
client.on('message', msg => messageHandler(msg, client));

// 🟢 Inicialización del cliente
client.initialize();

// 🔄 Exportación para usar en api.js y verificar estado
module.exports = client;
