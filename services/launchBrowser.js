// launchBrowser.js
const puppeteer = require('puppeteer');

async function launchBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', // ✅ más robusto en entornos sin GUI
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        console.log('🧠 Puppeteer lanzado correctamente');
        return browser;
    } catch (err) {
        console.error('❌ Error al lanzar Puppeteer:', err);
        throw err;
    }
}

module.exports = launchBrowser;
