// launchBrowser.js
const puppeteer = require('puppeteer');

async function launchBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', // ✅ robusto en entornos sin GUI
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: process.env.CHROMIUM_PATH || undefined, // 🔍 opcional para Render
        });

        console.log('🧠 Puppeteer lanzado correctamente');
        return browser;
    } catch (err) {
        console.error('❌ Error al lanzar Puppeteer:', err.message);
        if (err.stack) console.error(err.stack);
        throw err;
    }
}

module.exports = launchBrowser;
// CHROMIUM_PATH = /usr/bin/chromium-browser variable para render
