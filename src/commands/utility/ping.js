// src/commands/utility/ping.js

const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra a latência atual do bot.'),

  async execute(interaction) {
    // Usa reply direto (sem deferReply) para evitar timeout na medição
    const sent = await interaction.reply({ content: '...', fetchReply: true });

    const ws  = interaction.client.ws.ping;
    const api = sent.createdTimestamp - interaction.createdTimestamp;

    const embed = createEmbed(interaction)
      .setTitle('Latência do Bot')
      .setDescription('Tempo de resposta atual entre o bot e a API do Discord.')
      .addFields(
        { name: 'WebSocket', value: `\`${ws} ms\``,  inline: true },
        { name: 'API Round-Trip', value: `\`${api} ms\``, inline: true },
      );

    await interaction.editReply({ content: '', embeds: [embed] });
  },
};
