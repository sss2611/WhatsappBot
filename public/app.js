document.addEventListener('DOMContentLoaded', async () => {
    const estadoEl = document.getElementById('estado');
    const numeroEl = document.getElementById('numero');
    const qrEl = document.getElementById('qr');

    // 🔁 Consulta inicial por HTTP
    try {
        const res = await fetch('/api/status');
        const { estado, qr, number } = await res.json();

        actualizarEstado({ estado, numero: number, qr });
    } catch (err) {
        estadoEl.textContent = '⚠️ Error al obtener estado';
        numeroEl.textContent = '';
        qrEl.innerHTML = '';
        console.error('Error al obtener estado del bot:', err);
    }

    // 🔌 WebSocket en tiempo real
    const socket = io();

    socket.on('estadoBot', ({ estado, numero, qr }) => {
        actualizarEstado({ estado, numero, qr });
    });

    // 🧩 Función modular para actualizar el DOM
    function actualizarEstado({ estado, numero, qr }) {
        switch (estado) {
            case 'conectado':
                estadoEl.textContent = '✅ Bot conectado';
                numeroEl.textContent = `Número vinculado: ${numero}`;
                qrEl.innerHTML = '';
                if (Swal.isVisible()) Swal.close();
                break;

            case 'desconectado':
                estadoEl.textContent = '🔴 Bot no conectado';
                numeroEl.textContent = '';
                qrEl.innerHTML = '';
                if (qr?.startsWith('data:image')) {
                    Swal.fire({
                        title: 'Escanea el QR para vincular',
                        imageUrl: qr,
                        imageAlt: 'QR de vinculación',
                        confirmButtonText: 'Cerrar',
                        width: 350
                    });
                    const img = document.createElement('img');
                    img.src = qr;
                    img.alt = 'Escanea el QR para vincular';
                    img.style.maxWidth = '300px';
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
