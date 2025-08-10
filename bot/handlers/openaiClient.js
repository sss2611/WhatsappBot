// bot/handlers/openaiClient.js
import { Configuration, OpenAIApi } from 'openai';

const openaiKey = process.env.OPENAI_API_KEY;
if (!openaiKey) throw new Error('Falta OPENAI_API_KEY en entorno');

const config = new Configuration({ apiKey: openaiKey });
const openai = new OpenAIApi(config);

export default openai;
