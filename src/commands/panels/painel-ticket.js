// src/commands/panels/painel-ticket.js

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('painel-ticket')
    .setDescription('Cria o painel de abertura de tickets neste canal.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(opt =>
      opt
        .setName('titulo')
        .setDescription('Título do painel.')
        .setRequired(false)
        .setMaxLength(256),
    )
    .addStringOption(opt =>
      opt
        .setName('descricao')
        .setDescription('Descrição do painel.')
        .setRequired(false)
        .setMaxLength(1024),
    )
    .addStringOption(opt =>
      opt
        .setName('categorias')
        .setDescription('Categorias separadas por vírgula (ex: Suporte, Parceria, Dúvidas). Máx. 5.')
        .setRequired(false),
    ),

  async execute(interaction) {
    const titulo    = interaction.options.getString('titulo')    ?? 'Central de Tickets';
    const descricao = interaction.options.getString('descricao') ??
      'Selecione uma categoria no menu abaixo para abrir um ticket com a nossa equipe.';
    const categoriasRaw = interaction.options.getString('categorias') ??
      'Suporte, Parceria, Dúvidas';

    // Processa até 5 categorias
    const categorias = categoriasRaw
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)
      .slice(0, 5);

    const embed = createEmbed(interaction)
      .setTitle(titulo)
      .setDescription(descricao);

    const options = categorias.map((cat, i) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(cat)
        .setValue(`ticket_cat_${i}_${cat.toLowerCase().replace(/\s+/g, '_')}`),
    );

    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket_category')
      .setPlaceholder('Selecione uma categoria...')
      .addOptions(options);

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
