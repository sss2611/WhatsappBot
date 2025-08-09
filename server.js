const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');
const { limpiarSesionLocal } = require('./bot/sessionCleaner');
const launchBrowser = require('./services/launchBrowser');
const emitirQR = require('./bot/emitirQR');
const handleMessage = require('./bot/messageHandler');

const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/api', apiRoutes);

// 🌐 WebSocket + Baileys
wss.on('connection', async (ws) => {
    console.log('🔌 Cliente WebSocket conectado');
    ws.send(JSON.stringify({ status: 'ready' }));

    const { state, saveCreds } = await useMultiFileAuthState('./auth');

    const sock = makeWASocket({
        auth: state,
        browser: ['SandraBot', 'Chrome', '1.0'],
    });

    sock.ev.on('creds.update', async () => {
        console.log('💾 Credenciales actualizadas');
        await saveCreds();
    });

    sock.ev.on('connection.update', (update) => {
        const { qr, connection, lastDisconnect } = update;

        if (connection === 'open') {
            ws.send(JSON.stringify({ status: 'vinculado' }));
            console.log('✅ Bot vinculado');
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log('❌ Bot desconectado. Código:', reason);
            ws.send(JSON.stringify({ status: 'desconectado' }));
        }

        if (connection === 'connecting') {
            ws.send(JSON.stringify({ status: 'conectando' }));
            console.log('⏳ Conectando...');
        }

        if (qr && connection !== 'open') {
            emitirQR(ws, qr);
            console.log('🟡 QR generado');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        console.log('🧠 Evento messages.upsert recibido');
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message) return;

        console.log('📩 Mensaje detectado:', msg.key.remoteJid);
        await handleMessage(msg, sock);
    });

    ws.on('close', () => {
        console.log('❌ Cliente WebSocket desconectado');
    });
});

// 🚀 Lanzar Puppeteer si lo necesitás
(async () => {
    try {
        const browser = await launchBrowser();
        console.log('🧠 Puppeteer listo');
    } catch (err) {
        console.error('❌ Error al lanzar Puppeteer:', err);
    }
})();

const PORT = process.env.PORT || 1000;
server.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));

// 🧹 Limpieza al cerrar el proceso
process.on('SIGINT', async () => {
    console.log('🛑 Proceso interrumpido');
    await limpiarSesionLocal();
    process.exit();
});

process.on('SIGTERM', async () => {
    console.log('🛑 Proceso terminado');
    await limpiarSesionLocal();
    process.exit();
});
