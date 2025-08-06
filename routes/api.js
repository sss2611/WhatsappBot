const express = require('express');
const router = express.Router();
const client = require('../bot/index');

// 🟢 Verificar estado del bot
router.get('/status', (req, res) => {
    const conectado = client && client.info ? true : false;
    res.json({ connected: conectado });
});

// 💬 Enviar mensaje desde el panel
router.post('/send-message', async (req, res) => {
    const { number, message } = req.body || {};

    if (!number || !message) {
        return res.status(400).json({ error: 'Faltan número o mensaje' });
    }

    const formattedNumber = number.includes('@c.us') ? number : `${number}@c.us`;

    try {
        await client.sendMessage(formattedNumber, message);
        res.json({ status: 'enviado' });
    } catch (err) {
        console.error('❌ Error al enviar mensaje:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
