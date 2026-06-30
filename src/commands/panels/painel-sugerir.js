// src/commands/panels/painel-sugerir.js

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('painel-sugerir')
    .setDescription('Cria o painel de sugestões neste canal.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption(opt =>
      opt
        .setName('canal-sugestoes')
        .setDescription('Canal onde as sugestões enviadas pelos membros serão publicadas.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('titulo')
        .setDescription('Título do painel (opcional).')
        .setRequired(false)
        .setMaxLength(256),
    )
    .addStringOption(opt =>
      opt
        .setName('descricao')
        .setDescription('Descrição do painel (opcional).')
        .setRequired(false)
        .setMaxLength(1024),
    ),

  async execute(interaction) {
    const canalSugestoes = interaction.options.getChannel('canal-sugestoes');
    const titulo         = interaction.options.getString('titulo')    ?? 'Painel de Sugestões';
    const descricao      = interaction.options.getString('descricao') ??
      `Tem uma ideia para melhorar o servidor? Clique no botão abaixo para enviar sua sugestão.`;

    const embed = createEmbed(interaction)
      .setTitle(titulo)
      .setDescription(descricao);

    // O ID do canal de sugestões é codificado no customId do botão
    // para que o handler saiba onde postar a sugestão do membro.
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`suggest_open:${canalSugestoes.id}`)
        .setLabel('Enviar Sugestão')
        .setStyle(ButtonStyle.Secondary),
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
