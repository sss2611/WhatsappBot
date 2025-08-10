const axios = require('axios');
const { OPENAI_MODEL, headers } = require('./openaiConfig');

async function getAIReply(userText) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: OPENAI_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'Sos un asistente amable y profesional de EsTODOMADERA. Respondé con claridad y simpatía.',
                    },
                    {
                        role: 'user',
                        content: userText,
                    },
                ],
                temperature: 0.7,
                max_tokens: 150,
            },
            { headers }
        );

        const reply = response.data.choices?.[0]?.message?.content;
        return reply?.trim() || 'Lo siento, no entendí tu mensaje. ¿Podés reformularlo?';
    } catch (error) {
        if (error.response?.status === 429) {
            console.warn('🧠 OpenAI saturado: límite de velocidad alcanzado');
            return '⚠️ La IA está procesando demasiadas solicitudes. Intentá en unos segundos.';
        }

        console.error('🧠 Error en OpenAI:', error.message);
        return 'Hubo un problema al procesar tu mensaje. Intentá más tarde.';
    }
}

module.exports = { getAIReply };
