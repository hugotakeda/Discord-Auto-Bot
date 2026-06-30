// src/commands/moderation/anunciar.js

const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anunciar')
    .setDescription('Envia um anúncio oficial do servidor em um canal específico.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption(opt =>
      opt
        .setName('canal')
        .setDescription('Canal onde o anúncio será publicado.')
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('mensagem')
        .setDescription('Conteúdo do anúncio.')
        .setRequired(true)
        .setMaxLength(2000),
    )
    .addStringOption(opt =>
      opt
        .setName('titulo')
        .setDescription('Título do anúncio (opcional).')
        .setRequired(false)
        .setMaxLength(256),
    ),

  async execute(interaction) {
    const canal    = interaction.options.getChannel('canal');
    const mensagem = interaction.options.getString('mensagem');
    const titulo   = interaction.options.getString('titulo') ?? 'Comunicado Oficial';

    await interaction.deferReply({ flags: 64 });

    const embed = createEmbed(interaction)
      .setTitle(titulo)
      .setDescription(mensagem)
      .addFields(
        { name: 'Publicado por', value: `${interaction.user}`, inline: true },
        { name: 'Canal',         value: `${canal}`,            inline: true },
      );

    try {
      await canal.send({ embeds: [embed] });

      const confirmacao = createEmbed(interaction)
        .setTitle('Anúncio Publicado')
        .setDescription(`O comunicado foi enviado com sucesso em ${canal}.`);

      await interaction.editReply({ embeds: [confirmacao] });
    } catch (err) {
      const erro = createEmbed(interaction)
        .setTitle('Falha ao Publicar Anúncio')
        .setDescription(`Não foi possível enviar a mensagem em ${canal}.\nVerifique se o bot tem permissão para enviar mensagens naquele canal.`);
      await interaction.editReply({ embeds: [erro] });
      console.error('[/anunciar]', err);
    }
  },
};
