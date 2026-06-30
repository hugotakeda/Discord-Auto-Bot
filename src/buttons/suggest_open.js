// src/buttons/suggest_open.js
// Abre o modal de sugestão e, após envio, posta a embed no canal configurado.
// O canal de destino é lido do customId do botão: "suggest_open:<channelId>"
// O channelId é propagado para o modal: "modal_suggest:<channelId>"

const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const { createEmbed } = require('../utils/embed');
const db = require('../utils/suggestionsDB');

module.exports = {
  // Botão "Enviar Sugestão" — abre o modal
  async execute(interaction) {
    const channelId = interaction.customId.split(':')[1];

    const modal = new ModalBuilder()
      .setCustomId(`modal_suggest:${channelId}`)
      .setTitle('Nova Sugestão');

    const input = new TextInputBuilder()
      .setCustomId('suggest_text')
      .setLabel('Descreva sua sugestão')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Escreva aqui sua sugestão de melhoria para o servidor...')
      .setMinLength(10)
      .setMaxLength(1000)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  },

  // Envio do modal — posta a embed da sugestão no canal configurado
  async handleModal(interaction) {
    const texto     = interaction.fields.getTextInputValue('suggest_text');
    const channelId = interaction.customId.split(':')[1];

    // Se o token já expirou, sai silenciosamente
    try {
      await interaction.deferReply({ flags: 64 });
    } catch {
      return;
    }

    const reply  = (embed) => interaction.editReply({ embeds: [embed] });

    // Busca o canal de destino
    const canalSugestoes = await interaction.guild.channels.fetch(channelId).catch(() => null);
    if (!canalSugestoes) {
      return reply(
        createEmbed(interaction)
          .setTitle('Erro de Configuração')
          .setDescription('O canal de sugestões configurado não foi encontrado. Contate a administração.'),
      );
    }

    // Embed da sugestão
    const embed = createEmbed(interaction)
      .setTitle('Sugestão')
      .setDescription(texto)
      .addFields(
        { name: 'Enviado por', value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        { name: 'Status',      value: 'Aguardando Avaliação', inline: true },
        { name: 'Votos',       value: '0 a favor  •  0 contra' },
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('suggest_up').setLabel('A Favor').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId('suggest_down').setLabel('Contra').setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`suggest_open:${canalSugestoes.id}`).setLabel('Fazer Sugestão').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('suggest_approve').setLabel('Aprovar').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('suggest_reject').setLabel('Reprovar').setStyle(ButtonStyle.Danger),
    );

    const msg = await canalSugestoes.send({ embeds: [embed], components: [row] });

    db.add({
      messageId: msg.id,
      channelId: canalSugestoes.id,
      guildId:   interaction.guild.id,
      authorId:  interaction.user.id,
      authorTag: interaction.user.tag,
      texto,
      upvotes:   [],
      downvotes: [],
      status:    'pendente',
    });

    return reply(
      createEmbed(interaction)
        .setTitle('Sugestão Enviada')
        .setDescription(`Sua sugestão foi publicada em ${canalSugestoes} e já está disponível para votação.`),
    );
  },
};
