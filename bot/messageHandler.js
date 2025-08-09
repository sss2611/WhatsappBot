// module.exports = (message, client) => {
//   const text = message.body.toLowerCase(); 

//   if (text === 'hola') {
//     message.reply('¡Hola! ¿En qué puedo ayudarte?');
//   } else if (text === 'info') {
//     message.reply('Puedes visitar nuestro Facebook para mas información: https://www.facebook.com/groups/507296329349636/user/100026735442194/?locale=es_LA.');
//   } else if (text.includes('precio')) {
//     message.reply('Nuestros precios varían según el producto. ¿Qué te interesa?');
//   }
// };

module.exports = async (msg, sock) => {
  const jid = msg.key.remoteJid;
  const isFromMe = msg.key.fromMe;
  const isGroup = jid.endsWith('@g.us');

  // 🧩 Extraer texto del mensaje
  const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    '';

  if (!text) {
    console.log('⚠️ Mensaje sin texto, ignorado');
    return;
  }

  const lowerText = text.toLowerCase();
  console.log(`📩 Mensaje recibido: ${lowerText}`);

  // 🧠 Lógica de respuesta
  if (lowerText === 'hola') {
    await sock.sendMessage(jid, { text: '¡Hola! ¿En qué puedo ayudarte?' });
  } else if (lowerText === 'info') {
    await sock.sendMessage(jid, {
      text: 'Puedes visitar nuestro Facebook para más información: https://www.facebook.com/groups/507296329349636/user/100026735442194/?locale=es_LA.',
    });
  } else if (lowerText.includes('precio')) {
    await sock.sendMessage(jid, {
      text: 'Nuestros precios varían según el producto. ¿Qué te interesa?',
    });
  }
};
