// src/events/ready.js
// Disparado uma vez quando o bot está online e pronto.

const { ActivityType } = require('discord.js');

module.exports = {
  name: 'clientReady',
  once: true,
  execute(client) {
    console.log(`[Online] Bot conectado como ${client.user.tag}`);

    // Função que atualiza o status dinamicamente
    const updateStatus = () => {
      const totalServidores = client.guilds.cache.size;
      client.user.setPresence({
        activities: [{ 
          name: 'customstatus', 
          state: `Monitorando ${totalServidores} servidor${totalServidores > 1 ? 'es' : ''}.`,
          type: ActivityType.Custom 
        }],
        status: 'online',
      });
    };

    // Roda agora mesmo
    updateStatus();

    // Roda de novo a cada 5 minutos (300.000 ms)
    setInterval(updateStatus, 300000);
  },
};
