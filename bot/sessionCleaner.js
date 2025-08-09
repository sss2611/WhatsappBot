const fs = require('fs/promises');
const path = require('path');

async function limpiarSesionLocal() {
    const basePath = path.join(__dirname, '.wwebjs_auth', 'session', 'Default');
    const cachePath = path.join(__dirname, '.wwebjs_cache');

    try {
        await fs.rm(basePath, { recursive: true, force: true });
        console.log('🧹 Sesión .wwebjs_auth eliminada');
    } catch (err) {
        console.warn('⚠️ No se pudo eliminar .wwebjs_auth:', err.message);
    }

    try {
        await fs.rm(cachePath, { recursive: true, force: true });
        console.log('🧹 Cache .wwebjs_cache eliminada');
    } catch (err) {
        console.warn('⚠️ No se pudo eliminar .wwebjs_cache:', err.message);
    }
}

module.exports = { limpiarSesionLocal };
