module.exports = (message, client) => {
  const text = message.body.toLowerCase(); 

  if (text === 'hola') {
    message.reply('¡Hola! ¿En qué puedo ayudarte?');
  } else if (text === 'info') {
    message.reply('Puedes visitar nuestro Facebook para mas información: https://www.facebook.com/groups/507296329349636/user/100026735442194/?locale=es_LA.');
  } else if (text.includes('precio')) {
    message.reply('Nuestros precios varían según el producto. ¿Qué te interesa?');
  }
};