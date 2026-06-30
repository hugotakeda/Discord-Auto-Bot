// src/buttons/ticket_create.js
// Cria o canal privado de ticket quando membro seleciona uma categoria.

const {
  ChannelType,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
const { createEmbed } = require('../utils/embed');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply({ flags: 64 });

    // Extrai nome legível da categoria do valor do select: "ticket_cat_0_suporte"
    const nomeCategoria = interaction.values[0]
      .replace(/^ticket_cat_\d+_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    const guild  = interaction.guild;
    const membro = interaction.member;

    // Verifica se já existe ticket aberto deste membro nesta categoria
    const nomeCanal = `ticket-${membro.user.username}-${nomeCategoria.toLowerCase().replace(/\s+/g, '-')}`.slice(0, 100);
    const existente = guild.channels.cache.find(c => c.name === nomeCanal);

    if (existente) {
      const embed = createEmbed(interaction)
        .setTitle('Ticket Já Aberto')
        .setDescription(`Você já possui um ticket aberto nesta categoria: ${existente}\n\nFeche o ticket atual antes de abrir um novo.`);
      return interaction.editReply({ embeds: [embed] });
    }

    try {
      const canal = await guild.channels.create({
        name: nomeCanal,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          { id: guild.roles.everyone, deny: [PermissionFlagsBits.ViewChannel] },
          {
            id: membro.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
          {
            id: interaction.client.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
        ],
      });

      const embed = createEmbed(interaction)
        .setTitle(`Ticket — ${nomeCategoria}`)
        .setDescription(
          `Olá, ${membro}! Seu ticket foi aberto com sucesso.\n\n` +
          `Descreva sua situação com o máximo de detalhes possível e aguarde o atendimento da equipe.\n\n` +
          `Quando o atendimento for concluído, clique em **Fechar Ticket**.`,
        )
        .addFields(
          { name: 'Categoria', value: nomeCategoria,     inline: true },
          { name: 'Aberto por', value: `${membro}`, inline: true },
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`ticket_close:${membro.id}`)
          .setLabel('Fechar Ticket')
          .setStyle(ButtonStyle.Danger),
      );

      await canal.send({ embeds: [embed], components: [row] });

      const confirmacao = createEmbed(interaction)
        .setTitle('Ticket Aberto')
        .setDescription(`Seu ticket foi criado em ${canal}.\nResponda lá para iniciar o atendimento.`);
      await interaction.editReply({ embeds: [confirmacao] });

    } catch (err) {
      console.error('[ticket_create]', err);
      const erro = createEmbed(interaction)
        .setTitle('Falha ao Criar Ticket')
        .setDescription('Não foi possível criar o canal do ticket. Verifique as permissões do bot.');
      await interaction.editReply({ embeds: [erro] });
    }
  },
};
