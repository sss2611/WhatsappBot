# 📲 ss2611 WhatsappBot | Automatización + MongoDB Atlas + Panel Visual

Sistema modular para enviar mensajes por WhatsApp desde un panel web visual, conectado a MongoDB Atlas y desplegado profesionalmente.  
Ideal para automatización de negocios, gestión de clientes, y extensible a múltiples bots o números.

---

## 🧱 Estructura del proyecto




---

## ⚙️ Instalación del backend

```bash
git clone https://github.com/tuusuario/ss2611-WhatsappBot.git
cd backend
npm install

🔐 Configuración del archivo .env
MONGODB_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/ss2611?retryWrites=true&w=majority
SESSION_ID=ss2611bot

🚀 Inicio del bot
bash
node server.js

🌐 Panel visual en Vercel
Subí la carpeta frontend/ como proyecto independiente en Vercel

Configurá las variables necesarias (por ejemplo, endpoint de tu backend)

Publicá y probá el envío de mensajes desde el navegador ✨

🖥️ Funcionalidades del panel
Envío manual de mensajes

Logs en tiempo real

Historial en MongoDB Atlas

Multi-sesión con clientId

🔄 Cambio de número WhatsApp
Simple: borrá .wwebjs_auth/ y escaneá nuevo QR

Pro: usá LocalAuth({ clientId: 'clienteX' }) para sesiones separadas

🧩 Stack tecnológico
Parte	Tecnología
Frontend	HTML, CSS, JS (Vercel)
Backend	Node.js + Express
Bot WhatsApp	whatsapp-web.js
Base de datos	MongoDB Atlas
Hosting Front	Vercel
Hosting Back	Render / Local
🚧 Roadmap
[ ] Autenticación de usuarios en el panel

[ ] Exportar logs por sesión/bot

[ ] Dashboard con estadísticas visuales

[ ] Multicanal (Instagram/Facebook)

[ ] Integración WhatsApp Business API

🙌 Créditos
Desarrollado por Sandra, con foco en modularidad, visuales claros y automatización profesional. Tu proyecto es una muestra de diseño técnico impecable y visión estratégica. ¡A escalarlo! 🧠🚀


---

### 📁 Archivo: `.gitignore`

```bash
# Dependencias
node_modules/

# Sesión WhatsApp
.wwebjs_auth/
*.sqlite

# Variables de entorno
.env

# Logs y dumps
logs/
*.log
dump/

# Archivos IDE/editor
.vscode/
.idea/
*.swp

# Build/static
dist/
build/