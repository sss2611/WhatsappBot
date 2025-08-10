// launchBrowser.js

// const os = require('os');
// const fs = require('fs');
// const puppeteer = require('puppeteer-core');

// function detectChromiumPath() {
//     const platform = os.platform();

//     const paths = {
//         win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//         linux: '/usr/bin/chromium-browser',
//         darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
//     };

//     const envPath = process.env.CHROMIUM_PATH;
//     const fallbackPath = paths[platform];

//     const finalPath = envPath || fallbackPath;

//     if (!fs.existsSync(finalPath)) {
//         console.warn(`⚠️ Chromium no encontrado en: ${finalPath}`);
//         return null;
//     }

//     console.log(`🧭 Usando Chromium en: ${finalPath}`);
//     return finalPath;
// }

// async function launchBrowser() {
//     const executablePath = detectChromiumPath();

//     if (!executablePath) {
//         throw new Error('❌ No se encontró Chromium en el sistema ni en CHROMIUM_PATH');
//     }

//     try {
//         const browser = await puppeteer.launch({
//             headless: 'new',
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//             executablePath,
//         });

//         console.log('🧠 Puppeteer lanzado correctamente');
//         return browser;
//     } catch (err) {
//         console.error('❌ Error al lanzar Puppeteer:', err.message);
//         throw err;
//     }
// }

// module.exports = launchBrowser;

// CHROMIUM_PATH = /usr/bin/chromium-browser variable para render

const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda'); // opcional para entornos serverless

async function launchBrowser() {
    const executablePath = process.env.CHROMIUM_PATH || chromium.executablePath;

    if (!executablePath || !fs.existsSync(executablePath)) {
        console.warn(`⚠️ Chromium no encontrado en: ${executablePath}`);
        throw new Error('❌ No se encontró Chromium en el sistema ni en CHROMIUM_PATH');
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath,
        });

        console.log('🧠 Puppeteer lanzado correctamente');
        return browser;
    } catch (err) {
        console.error('❌ Error al lanzar Puppeteer:', err.message);
        throw err;
    }
}
