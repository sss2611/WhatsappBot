document.addEventListener('DOMContentLoaded', () => {
    const estadoEl = document.getElementById('estado');
    const numeroEl = document.getElementById('numero');
    const qrEl = document.getElementById('qr');

    // 🔁 Consulta inicial por HTTP
    fetch('/api/status')
        .then(res => res.json())
        .then(({ estado, qr, number }) => {
            actualizarEstado({ estado, numero: number, qr });
        })
        .catch(err => {
            estadoEl.textContent = '⚠️ Error al obtener estado';
            numeroEl.textContent = '';
            qrEl.innerHTML = '';
            console.error('Error al obtener estado del bot:', err);
        });

    // 🔌 WebSocket puro
    const socket = new WebSocket(`ws://${location.host}`);

    socket.addEventListener('open', () => {
        console.log('🔗 WebSocket conectado');
    });

    socket.addEventListener('message', (event) => {
        try {
            const msg = JSON.parse(event.data);

            if (msg.type === 'qr') {
                actualizarEstado({ estado: 'desconectado', qr: msg.data });
            }

            if (msg.status === 'vinculado') {
                actualizarEstado({ estado: 'conectado', numero: '✔️' });
            }

            if (msg.status === 'desconectado') {
                actualizarEstado({ estado: 'desconectado' });
            }

            if (msg.status === 'conectando') {
                actualizarEstado({ estado: 'conectando' });
            }

            if (msg.status === 'ready') {
                console.log('🟢 WebSocket listo para recibir eventos');
            }

            if (msg.respuesta) {
                console.log('🤖 Respuesta recibida:', msg.respuesta);
                mostrarRespuesta(msg.respuesta); // ← esta función la definís abajo
            }

        } catch (err) {
            console.error('❌ Error al procesar mensaje WebSocket:', err);
        }
    });

    socket.addEventListener('close', () => {
        console.warn('🔌 WebSocket cerrado');
    });

    // 🧩 Función modular para actualizar el DOM
    function actualizarEstado({ estado, numero, qr }) {
        switch (estado) {
            case 'conectado':
                estadoEl.textContent = '✅ Bot conectado';
                numeroEl.textContent = `Número vinculado: ${numero || '✔️'}`;
                qrEl.innerHTML = '';
                if (Swal.isVisible()) Swal.close();
                break;

            case 'desconectado':
                estadoEl.textContent = '🔴 Bot no conectado';
                numeroEl.textContent = '';
                qrEl.innerHTML = '';

                if (qr?.startsWith('data:image')) {
                    const img = document.createElement('img');
                    img.src = qr;
                    img.alt = 'Escanea el QR para vincular';
                    img.style.maxWidth = '300px';
                    img.style.borderRadius = '8px';
                    img.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                    qrEl.innerHTML = '';
                    qrEl.appendChild(img);
                }
                break;

            case 'conectando':
                estadoEl.textContent = '⏳ Inicializando sesión...';
                numeroEl.textContent = '';
                qrEl.innerHTML = '';
                break;

            default:
                estadoEl.textContent = '⚠️ Estado desconocido';
                numeroEl.textContent = '';
                qrEl.innerHTML = '';
                break;
        }
    }
});

function mostrarRespuesta(texto) {
    Swal.fire({
        title: 'Respuesta del bot',
        text: texto,
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'swal2-popup-custom'
        }
    });
}
