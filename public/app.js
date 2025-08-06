// Chequeo inicial del estado del bot
fetch('/api/status')
    .then(res => res.json())
    .then(data => {
        const statusDiv = document.getElementById('status');
        if (data.connected) {
            statusDiv.textContent = '✅ Bot conectado';
            statusDiv.className = 'status-conectado';
        } else {
            statusDiv.textContent = '❌ Bot no disponible';
            statusDiv.className = 'status-desconectado';
        }
    })
    .catch(err => {
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = '⚠️ Error al obtener estado';
        statusDiv.className = 'status-desconectado';
    });

// Escucha del formulario
document.getElementById('sendMessageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const number = document.getElementById('number').value.trim();
    const message = document.getElementById('message').value.trim();
    const statusDiv = document.getElementById('status');
    const responseStatus = document.getElementById('responseStatus');

    // Función para actualizar estado visual
    function actualizarEstado(estado) {
        statusDiv.className = '';

        switch (estado) {
            case 'conectado':
                statusDiv.textContent = '✅ Conectado';
                statusDiv.classList.add('status-conectado');
                break;
            case 'desconectado':
                statusDiv.textContent = '❌ Desconectado';
                statusDiv.classList.add('status-desconectado');
                break;
            default:
                statusDiv.textContent = '🔄 Cargando...';
                statusDiv.classList.add('status-cargando');
                break;
        }
    }

    // Estado temporal de carga
    actualizarEstado('cargando');

    try {
        const res = await fetch('/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number, message })
        });

        const data = await res.json();

        if (data.status === 'enviado') {
            responseStatus.textContent = '✅ Mensaje enviado correctamente';
            responseStatus.className = 'respuesta-ok';
        } else {
            responseStatus.textContent = `❌ Error: ${data.error || 'No se pudo enviar el mensaje'}`;
            responseStatus.className = 'respuesta-error';
        }

        actualizarEstado('conectado'); // Actualiza según el resultado si el bot sigue en línea
    } catch (error) {
        responseStatus.textContent = '⚠️ Error al enviar mensaje';
        responseStatus.className = 'respuesta-error';
        actualizarEstado('desconectado');
    }
});
