// src/buttons/suggest_vote.js
// Gerencia os votos de upvote e downvote em sugestões.
// Cada usuário pode votar uma vez; clicar no mesmo voto remove o voto.

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createEmbed } = require('../utils/embed');
const db = require('../utils/suggestionsDB');

module.exports = {
  async execute(interaction, tipo) {
    // deferUpdate reconhece o botão sem alterar a mensagem ainda
    await interaction.deferUpdate();

    const suggestion = db.getByMessageId(interaction.message.id);
    if (!suggestion) return;

    const userId = interaction.user.id;

    // Remove de ambos os arrays (toggle e troca de voto)
    const jaVotouUp   = suggestion.upvotes.includes(userId);
    const jaVotouDown = suggestion.downvotes.includes(userId);

    suggestion.upvotes   = suggestion.upvotes.filter(id => id !== userId);
    suggestion.downvotes = suggestion.downvotes.filter(id => id !== userId);

    // Se clicou no mesmo que já tinha, apenas remove (toggle off)
    if (tipo === 'up'   && !jaVotouUp)   suggestion.upvotes.push(userId);
    if (tipo === 'down' && !jaVotouDown) suggestion.downvotes.push(userId);

    db.update(suggestion);

    const up   = suggestion.upvotes.length;
    const down = suggestion.downvotes.length;
    const total = up + down;
    const barUp   = total > 0 ? Math.round((up / total) * 10) : 0;
    const barDown = total > 0 ? 10 - barUp : 0;
    const barra   = `${'▓'.repeat(barUp)}${'░'.repeat(barDown)}`;

    // Reconstrói embed
    const embed = createEmbed(interaction)
      .setTitle('Sugestão')
      .setDescription(suggestion.texto)
      .addFields(
        { name: 'Enviado por', value: `<@${suggestion.authorId}> (${suggestion.authorTag})`, inline: true },
        { name: 'Status',      value: suggestion.status === 'pendente' ? 'Aguardando Avaliação' : suggestion.status, inline: true },
        { name: 'Placar',      value: `\`${barra}\`  **${up}** a favor  •  **${down}** contra` },
      );

    const encerrada = suggestion.status === 'reprovada' || suggestion.status === 'aprovada';

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('suggest_up')
        .setLabel('A Favor')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(encerrada),
      new ButtonBuilder()
        .setCustomId('suggest_down')
        .setLabel('Contra')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(encerrada),
      new ButtonBuilder()
        .setCustomId(`suggest_open:${suggestion.channelId}`)
        .setLabel('Fazer Sugestão')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('suggest_approve')
        .setLabel('Aprovar')
        .setStyle(ButtonStyle.Success)
        .setDisabled(encerrada),
      new ButtonBuilder()
        .setCustomId('suggest_reject')
        .setLabel('Reprovar')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(encerrada),
    );

    await interaction.message.edit({ embeds: [embed], components: [row] });
  },
};
