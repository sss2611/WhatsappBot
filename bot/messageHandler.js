module.exports = (message, client) => {
  const text = message.body.toLowerCase(); // Convierte todo a minúsculas

  if (text === 'hola') {
    message.reply('¡Hola! ¿En qué puedo ayudarte?');
  } else if (text === 'info') {
    message.reply('Puedes consultar nuestro sitio web para más información.');
  } else if (text.includes('precio')) {
    message.reply('Nuestros precios varían según el producto. ¿Qué te interesa?');
  }
};