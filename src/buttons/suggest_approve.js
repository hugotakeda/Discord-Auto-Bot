// src/buttons/suggest_approve.js
// Admin clica em "Aprovar" → modal pedindo uma nota/comentário
// → embed da sugestão atualizada com status Aprovada + DM ao autor.

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
  // Botão Aprovar — verifica permissão e exibe modal
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      const embed = createEmbed(interaction)
        .setTitle('Sem Permissão')
        .setDescription('Apenas administradores podem aprovar sugestões.');
      return interaction.reply({ embeds: [embed], flags: 64 });
    }

    const modal = new ModalBuilder()
      .setCustomId(`modal_approve:${interaction.message.id}`)
      .setTitle('Aprovar Sugestão');

    const input = new TextInputBuilder()
      .setCustomId('approve_note')
      .setLabel('Nota para o autor (opcional)')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Deixe uma mensagem para o autor da sugestão aprovada...')
      .setMinLength(0)
      .setMaxLength(512)
      .setRequired(false);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  },

  // Modal enviado — edita a embed e notifica o autor
  async handleModal(interaction) {
    const nota      = interaction.fields.getTextInputValue('approve_note')?.trim() || null;
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

    suggestion.status = 'aprovada';
    if (nota) suggestion.nota = nota;
    db.update(suggestion);

    try {
      const canal = await interaction.guild.channels.fetch(suggestion.channelId);
      const msg   = await canal.messages.fetch(messageId);

      const fields = [
        { name: 'Enviado por',  value: `<@${suggestion.authorId}> (${suggestion.authorTag})`, inline: true },
        { name: 'Status',       value: 'Aprovada',            inline: true },
        { name: 'Aprovado por', value: `${interaction.user}`, inline: true },
        { name: 'Votos Finais', value: `**${suggestion.upvotes.length}** a favor  •  **${suggestion.downvotes.length}** contra` },
      ];

      if (nota) {
        fields.push({ name: 'Nota da Administração', value: nota });
      }

      const embedAtualizada = createEmbed(interaction)
        .setTitle('Sugestão — Aprovada')
        .setDescription(suggestion.texto)
        .addFields(...fields);

      // Desabilita todos os botões após aprovação
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
          .setCustomId('suggest_approve')
          .setLabel('Aprovada')
          .setStyle(ButtonStyle.Success)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('suggest_reject')
          .setLabel('Reprovar')
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );

      await msg.edit({ embeds: [embedAtualizada], components: [row] });

      // Notifica o autor via DM
      const autor = await interaction.guild.members.fetch(suggestion.authorId).catch(() => null);
      if (autor) {
        const embedDM = createEmbed(interaction.guild)
          .setTitle(`Sua sugestão foi aprovada em ${interaction.guild.name}`)
          .setDescription('A administração do servidor aprovou sua sugestão. Obrigado pela contribuição!')
          .addFields(
            { name: 'Sugestão',      value: suggestion.texto },
            { name: 'Aprovado por',  value: interaction.user.tag },
            ...(nota ? [{ name: 'Nota da Administração', value: nota }] : []),
          );
        await autor.send({ embeds: [embedDM] }).catch(() => {});
      }

      const confirmacao = createEmbed(interaction)
        .setTitle('Sugestão Aprovada')
        .setDescription('A sugestão foi marcada como aprovada e o autor foi notificado por DM.');
      await interaction.editReply({ embeds: [confirmacao] });

    } catch (err) {
      console.error('[suggest_approve]', err);
      const erro = createEmbed(interaction)
        .setTitle('Erro ao Atualizar')
        .setDescription('Não foi possível editar a mensagem da sugestão.');
      await interaction.editReply({ embeds: [erro] });
    }
  },
};
