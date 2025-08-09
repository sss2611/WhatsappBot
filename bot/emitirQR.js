// bot/qrEmitter.js
const { toDataURL } = require('qrcode');

let lastQR = null;

/**
 * Emite el QR como imagen base64 por WebSocket
 * @param {WebSocket} ws - conexión activa
 * @param {string} nuevoQR - código QR en texto plano
 */
async function emitirQR(ws, nuevoQR) {
    if (!nuevoQR || nuevoQR === lastQR) return; // Evita duplicidad

    lastQR = nuevoQR;

    try {
        const qrDataURL = await toDataURL(nuevoQR);
        ws.send(JSON.stringify({ type: 'qr', data: qrDataURL }));
        console.log('📤 QR enviado por WebSocket');
    } catch (err) {
        console.error('❌ Error al generar QR:', err);
        ws.send(JSON.stringify({ type: 'error', data: 'Error al generar QR' }));
    }
}

module.exports = emitirQR;
