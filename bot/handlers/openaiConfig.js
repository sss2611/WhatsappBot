// bot/handlers/openaiConfig.js
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

if (!OPENAI_API_KEY) throw new Error('Falta OPENAI_API_KEY en entorno');

const headers = {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
};

module.exports = { OPENAI_API_KEY, OPENAI_MODEL, headers };
