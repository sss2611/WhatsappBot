const fs = require('fs/promises');
const path = require('path');

async function limpiarSesionLocal() {
    const authPath = path.join(__dirname, '../auth');
    const credsPath = path.join(authPath, 'creds.json');

    try {
        const credsRaw = await fs.readFile(credsPath, 'utf-8');
        const creds = JSON.parse(credsRaw);

        if (creds?.registered) {
            console.log('🧪 Sesión activa detectada, no se limpia');
            return;
        }
    } catch (err) {
        console.warn('⚠️ No se pudo leer creds.json, se asume sesión inválida');
    }

    try {
        await fs.rm(authPath, { recursive: true, force: true });
        console.log('🧹 Sesión Baileys eliminada');
    } catch (err) {
        console.warn('⚠️ No se pudo eliminar ./auth:', err.message);
    }
}

module.exports = { limpiarSesionLocal };
