// src/handlers/commandHandler.js
// Carrega dinamicamente todos os arquivos de comando da pasta commands/

const fs   = require('fs');
const path = require('path');

module.exports = function loadCommands(client) {
  const commandsPath = path.join(__dirname, '..', 'commands');

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const command = require(fullPath);
        if (command?.data && command?.execute) {
          client.commands.set(command.data.name, command);
          console.log(`[Comando] Carregado: ${command.data.name}`);
        } else {
          console.warn(`[Aviso] Arquivo sem estrutura válida: ${fullPath}`);
        }
      }
    }
  }

  walk(commandsPath);
};
