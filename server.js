const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const cors = require('cors');
const morgan = require('morgan');
const { limpiarSesionLocal } = require('./bot/sessionCleaner');
const launchBrowser = require('./services/launchBrowser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor activo en puerto ${PORT}`));

// 🧹 Limpieza al cerrar el proceso (solo señales que permiten async)
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
