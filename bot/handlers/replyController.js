const path = require('path');
const basePath = path.resolve(__dirname, '..', '..', 'public', 'img');

async function getReply(sock, jid, text) {
    if (!text || typeof text !== 'string') return;

    const lowerText = text.toLowerCase();

    if (lowerText === 'hola') {
        await sock.sendMessage(jid, {
            text: 'Somos EsTODOMADERA, madera que dura, confianza que crece 💫'
        });

        for (let i = 1; i <= 4; i++) {
            const imgPath = `${basePath}/${i}.jpg`;

            await sock.sendMessage(jid, {
                image: { url: imgPath },
                caption: `Producto ${i}`,
                jpegThumbnail: null // 🔒 evita generación automática
            });
        }

        await sock.sendMessage(jid, {
            text: '¿Cuál producto le interesa? Contestame con el número de la imagen.'
        });

        return;
    }

    if (lowerText === 'info') {
        await sock.sendMessage(jid, {
            text: 'Puedes visitar nuestro Facebook para más información: https://www.facebook.com/groups/507296329349636/user/100026735442194/?locale=es_LA.'
        });
        return;
    }

    if (lowerText.includes('precio')) {
        await sock.sendMessage(jid, {
            text: 'Nuestros precios varían según el producto. ¿Qué te interesa?'
        });
        return;
    }

    return;
}

module.exports = { getReply };
