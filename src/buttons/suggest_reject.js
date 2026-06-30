// src/buttons/suggest_reject.js
// Admin clica em "Reprovar" → modal pedindo motivo → embed atualizada + DM ao autor.

const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');
const { createEmbed } = require('../utils/embed');
const db = require('../utils/suggestionsDB');

module.exports = {
  // Botão Reprovar — verifica permissão e exibe o modal
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      const embed = createEmbed(interaction)
        .setTitle('Sem Permissão')
        .setDescription('Apenas administradores podem reprovar sugestões.');
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    const modal = new ModalBuilder()
      .setCustomId(`modal_reject:${interaction.message.id}`)
      .setTitle('Reprovar Sugestão');

    const input = new TextInputBuilder()
      .setCustomId('reject_reason')
      .setLabel('Motivo da reprovação')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Explique o motivo pelo qual esta sugestão está sendo reprovada...')
      .setMinLength(5)
      .setMaxLength(512)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  },

  // Modal enviado — edita a embed com o motivo e notifica o autor
  async handleModal(interaction) {
    const motivo    = interaction.fields.getTextInputValue('reject_reason');
    const messageId = interaction.customId.split(':')[1];

    try {
      await interaction.deferReply({ flags: 64 });
    } catch {
      return;
    }

    const suggestion = db.getByMessageId(messageId);
    if (!suggestion) {
      const embed = createEmbed(interaction)
        .setTitle('Sugestão Não Encontrada')
        .setDescription('Não foi possível localizar esta sugestão no banco de dados interno.');
      return interaction.editReply({ embeds: [embed] });
    }

    suggestion.status = 'reprovada';
    suggestion.motivo = motivo;
    db.update(suggestion);

    try {
      const canal = await interaction.guild.channels.fetch(suggestion.channelId);
      const msg   = await canal.messages.fetch(messageId);

      const embedAtualizada = createEmbed(interaction)
        .setTitle('Sugestão — Reprovada')
        .setDescription(suggestion.texto)
        .addFields(
          { name: 'Enviado por',  value: `<@${suggestion.authorId}> (${suggestion.authorTag})`, inline: true },
          { name: 'Status',       value: 'Reprovada',         inline: true },
          { name: 'Reprovado por', value: `${interaction.user}`, inline: true },
          { name: 'Votos Finais', value: `**${suggestion.upvotes.length}** a favor  •  **${suggestion.downvotes.length}** contra` },
          { name: 'Motivo da Reprovação', value: motivo },
        );

      // Desabilita todos os botões após reprovação
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('suggest_up')
          .setLabel('A Favor')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('suggest_down')
          .setLabel('Contra')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`suggest_open:${suggestion.channelId}`)
          .setLabel('Fazer Sugestão')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('suggest_reject')
          .setLabel('Reprovada')
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );

      await msg.edit({ embeds: [embedAtualizada], components: [row] });

      // Notifica o autor via DM
      const autor = await interaction.guild.members.fetch(suggestion.authorId).catch(() => null);
      if (autor) {
        const embedDM = createEmbed(interaction.guild)
          .setTitle(`Sua sugestão foi reprovada em ${interaction.guild.name}`)
          .addFields(
            { name: 'Sugestão',      value: suggestion.texto },
            { name: 'Motivo',        value: motivo },
            { name: 'Reprovado por', value: interaction.user.tag },
          );
        await autor.send({ embeds: [embedDM] }).catch(() => {});
      }

      const confirmacao = createEmbed(interaction)
        .setTitle('Sugestão Reprovada')
        .setDescription('A sugestão foi marcada como reprovada e o autor foi notificado por DM.');
      await interaction.editReply({ embeds: [confirmacao] });

    } catch (err) {
      console.error('[suggest_reject]', err);
      const erro = createEmbed(interaction)
        .setTitle('Erro ao Atualizar')
        .setDescription('Não foi possível editar a mensagem da sugestão.');
      await interaction.editReply({ embeds: [erro] });
    }
  },
};
