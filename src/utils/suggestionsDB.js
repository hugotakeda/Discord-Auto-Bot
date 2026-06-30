// src/utils/suggestionsDB.js
// Persistência simples em JSON para sugestões.
// Lê/escreve o arquivo data/suggestions.json sincronamente para simplicidade.

const fs   = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'suggestions.json');

function read() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function write(data) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = {
  getAll() {
    return read();
  },

  getByMessageId(messageId) {
    return read().find(s => s.messageId === messageId) ?? null;
  },

  add(suggestion) {
    const data = read();
    data.push(suggestion);
    write(data);
  },

  update(suggestion) {
    const data = read();
    const idx  = data.findIndex(s => s.messageId === suggestion.messageId);
    if (idx !== -1) {
      data[idx] = suggestion;
      write(data);
    }
  },

  remove(messageId) {
    const data = read().filter(s => s.messageId !== messageId);
    write(data);
  },
};
