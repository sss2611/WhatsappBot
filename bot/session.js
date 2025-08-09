const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const { limpiarSesionLocal } = require('./sessionCleaner');

let estado = 'conectando';
let ultimoQR = null;
let numero = null;

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', async qr => {
  try {
    ultimoQR = await QRCode.toDataURL(qr);
    estado = 'desconectado';
    console.log('🟡 QR generado');
  } catch (err) {
    console.error('❌ Error al generar QR:', err);
  }
});

client.on('ready', () => {
  estado = 'conectado';
  numero = client.info?.wid?.user || null;
  console.log('✅ Sesión iniciada');
  if (global.io) {
    global.io.emit('estadoBot', { estado: 'conectado', numero });
  }
});

client.on('disconnected', async reason => {
  estado = 'desconectado';
  numero = null;
  ultimoQR = null;
  console.log(`🔴 Bot desconectado: ${reason}`);
  await limpiarSesionLocal();
  if (global.io) {
    global.io.emit('estadoBot', { estado: 'desconectado', numero: null });
  }
});

// Métodos públicos
client.getEstado = () => estado;
client.getQR = () => ultimoQR;
client.getNumero = () => {
  return estado === 'conectado' && client.info?.wid?.user ? client.info.wid.user : null;
};

client.initialize();

module.exports = client;
