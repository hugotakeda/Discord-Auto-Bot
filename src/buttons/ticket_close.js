// src/buttons/ticket_close.js
// Fecha (deleta) o canal de ticket após confirmação.

const { createEmbed } = require('../utils/embed');

module.exports = {
  async execute(interaction) {
    const canal = interaction.channel;

    const embed = createEmbed(interaction)
      .setTitle('Ticket Encerrado')
      .setDescription(`Este ticket foi encerrado por ${interaction.user}.\n\nO canal será **deletado automaticamente** em 5 segundos.`)
      .addFields(
        { name: 'Fechado por', value: `${interaction.user}`, inline: true },
      );

    await interaction.reply({ embeds: [embed] });

    setTimeout(async () => {
      await canal.delete(`Ticket fechado por ${interaction.user.tag}`).catch(err => {
        console.error('[ticket_close] Erro ao deletar canal:', err.message);
      });
    }, 5000);
  },
};
