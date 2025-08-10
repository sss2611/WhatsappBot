# 📱 WhatsappBot Modular

Bot WhatsApp con arquitectura limpia, trazable y lista para producción. Integración avanzada con Baileys, WebSocket y panel web plano.

---

## 🚀 Características

- Backend Node.js con Express
- Integración con Baileys para WhatsApp
- WebSocket para estado en tiempo real
- Frontend plano con QR, estado y número vinculado
- Control absoluto de sesión y limpieza automática
- API REST para vinculación y monitoreo

---

## 📁 Estructura

WhatsappBot/
├── bot/                  # 🧠 Núcleo del bot: lógica, sesión y manejo de mensajes
|   └── handlers/
│   │    ├── aiResponder.js        ←
│   │    ├── greetedUsers.js       ← Control de saludos persistentes
│   │    ├── greetedUsers.json     ← Persistencia local
│   │    ├── openaiClient.js       ← 
│   │    ├── openaiConfig.js       ← 
│   │    └── replyController.js    ← Respuestas según mensaje
|   │
│   ├── index.js          # Inicializa el bot y gestiona eventos principales
│   ├── messageHandler.js # Procesa mensajes entrantes y respuestas
│   ├── session.js        # Control de sesión activa y estado vinculado
│   └── sessionCleaner.js # Limpieza automática de sesiones obsoletas
│
├── public/               # 🌐 Frontend plano para visualización y control
│   ├── index.html        # Interfaz principal con QR y estado
│   ├── app.js            # WebSocket + lógica de conexión con backend
│   └── styles.css        # Estilos visuales del panel
│
├── routes/               # 🔗 API REST para comunicación frontend-backend
│   └── api.js            # Endpoints: QR, estado, número vinculado
│
├── server.js             # 🚀 Servidor Express: inicia backend y WebSocket
├── .env                  # ⚙️ Variables de entorno (puerto, rutas, claves)
├── package.json          # 📦 Configuración de dependencias y scripts
└── README.md             # 📘 Documentación técnica del proyecto

---

## ⚙️ Instalación

```bash
npm install

🟢 Inicio local
npm start

🌐 Despliegue en Railway
Subí el proyecto o conectá tu repo.

Configurá las variables de entorno:

PORT=1000

SESSION_PATH=./sessions

Railway detecta npm start y levanta el bot.

📡 Endpoints
GET /api/status → Estado del bot

GET /api/qr → QR en base64

GET /api/number → Número vinculado

🧠 Requisitos
Node.js 20+

Baileys actualizado

WebSocket estable

Panel web sin dependencias rotas

🧼 Limpieza de sesión
El módulo sessionCleaner.js elimina sesiones obsoletas y mantiene el estado limpio.

🛡️ Autora
Sandra — Arquitecta SaaS, experta en bots WhatsApp, trazabilidad y automatización profesional.