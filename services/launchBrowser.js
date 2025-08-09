// launchBrowser.js
const puppeteer = require('puppeteer');

async function launchBrowser() {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });
        console.log('🧠 Puppeteer lanzado correctamente');
        return browser;
    } catch (err) {
        console.error('❌ Error al lanzar Puppeteer:', err);
        throw err;
    }
}

module.exports = launchBrowser;
