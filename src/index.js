// src/index.js
// Entry point do bot — carrega handlers e faz login.

require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = require('./config');
const loadCommands = require('./handlers/commandHandler');
const loadEvents   = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// Coleção de comandos disponível em todo o client
client.commands = new Collection();

// Carrega comandos e eventos
loadCommands(client);
loadEvents(client);

client.login(token).catch(err => {
  console.error('[ERRO] Falha ao fazer login:', err.message);
  process.exit(1);
});
