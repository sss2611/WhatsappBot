const { hasBeenGreeted, markAsGreeted } = require('./handlers/greetedUsers');
const { getReply } = require('./handlers/replyController');
const { getAIReply } = require('./handlers/aiResponder');

module.exports = async (msg, sock) => {
  if (!msg?.key?.remoteJid) return;

  const jid = msg.key.remoteJid;
  const isGroup = jid.endsWith('@g.us');
  if (isGroup) return; // Solo responder en chats privados

  // 🧩 Extraer texto del mensaje
    const text =
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    null;

if (!text) return; // Evitás pasar undefined

await getReply(sock, jid, text);


  const lowerText = text.toLowerCase();
  console.log(`📩 Mensaje recibido de ${jid}: ${lowerText}`);

  // 🟨 Saludo inicial si es la primera vez
  if (!hasBeenGreeted(jid)) {
    await sock.sendMessage(jid, {
      text: 'Somos EsTODOMADERA, madera que dura, confianza que crece 💫',
    });
    markAsGreeted(jid);
  }

  // 🧠 Respuesta automática si coincide con comando
  const reply = await getReply(lowerText);
  if (reply) {
    await sock.sendMessage(jid, { text: reply });
    return;
  }

  // 🤖 Fallback a IA si no hay coincidencia
  const aiReply = await getAIReply(lowerText);
  await sock.sendMessage(jid, { text: aiReply });
  return aiReply;
};

