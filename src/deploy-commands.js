// src/deploy-commands.js
// Registra os slash commands de forma GLOBAL na API do Discord.
// Execute com: node src/deploy-commands.js

require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config');
const fs   = require('fs');
const path = require('path');

const commands = [];

// Percorre recursivamente a pasta commands/
function loadCommandFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadCommandFiles(fullPath);
    } else if (entry.name.endsWith('.js')) {
      const command = require(fullPath);
      if (command?.data?.toJSON) {
        commands.push(command.data.toJSON());
        console.log(`[+] Comando carregado: ${command.data.name}`);
      }
    }
  }
}

loadCommandFiles(path.join(__dirname, 'commands'));

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`\nRegistrando ${commands.length} comando(s) GLOBALMENTE...`);

    // 1. Opcional: Se houver um guildId antigo no .env, deleta os comandos desse servidor específico
    // Isso evita que o servidor antigo fique com 2 comandos iguais (um global e um local)
    if (guildId) {
      console.log('Limpando comandos locais do servidor de testes para evitar duplicação...');
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] }).catch(() => {});
    }

    // 2. Registra todos os comandos globalmente (visível em todos os servidores do bot)
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    
    console.log('Comandos registrados GLOBALMENTE com sucesso!');
    console.log('Atenção: Comandos globais podem demorar de 1 a 60 minutos para aparecerem em todos os servidores.');
  } catch (err) {
    console.error('[ERRO] Falha ao registrar comandos:', err);
  }
})();
