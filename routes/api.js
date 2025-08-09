const express = require('express');
const router = express.Router();
const client = require('../bot/index');

// 🟢 Verificar estado del bot
router.get('/status', (req, res) => {
    const estado = typeof client.getEstado === 'function' ? client.getEstado() : 'desconocido';
    const qr = typeof client.getQR === 'function' ? client.getQR() : null;
    const number = typeof client.getNumero === 'function' ? client.getNumero() : null;

    res.json({
        estado,
        qr: estado === 'desconectado' ? qr : null,
        number: estado === 'conectado' ? number : null
    });
});


// 💬 Enviar mensaje desde el panel (desactivado en frontend)
router.post('/send-message', async (req, res) => {
    const { number, message } = req.body || {};

    if (!number || !message) {
        return res.status(400).json({ error: 'Faltan número o mensaje' });
    }

    const isValidNumber = /^\d{10,15}$/.test(number);
    if (!isValidNumber) {
        return res.status(400).json({ error: 'Número inválido' });
    }

    const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;

    try {
        await client.sendMessage(formattedNumber, message);
        res.json({
            status: 'enviado',
            to: formattedNumber,
            message
        });
    } catch (err) {
        console.error('❌ Error al enviar mensaje:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/status', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

module.exports = router;
