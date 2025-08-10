const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'greetedUsers.json');

// Cargar saludados desde archivo
function loadGreetedUsers() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

// Guardar saludados en archivo
function saveGreetedUsers(users) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
}

// Verificar si ya fue saludado
function hasBeenGreeted(jid) {
    const users = loadGreetedUsers();
    return !!users[jid];
}

// Registrar nuevo saludo
function markAsGreeted(jid) {
    const users = loadGreetedUsers();
    users[jid] = true;
    saveGreetedUsers(users);
}

module.exports = {
    hasBeenGreeted,
    markAsGreeted,
};
