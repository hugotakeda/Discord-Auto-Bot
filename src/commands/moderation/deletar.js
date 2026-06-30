// src/commands/moderation/deletar.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deletar')
    .setDescription('Apaga uma quantidade específica de mensagens do canal.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(opt =>
      opt
        .setName('quantidade')
        .setDescription('Número de mensagens a apagar (1–100).')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true),
    ),

  async execute(interaction) {
    const quantidade = interaction.options.getInteger('quantidade');

    try {
      await interaction.deferReply({ flags: 64 });
    } catch {
      return;
    }

    try {
      const deletadas = await interaction.channel.bulkDelete(quantidade, true);

      const embed = createEmbed(interaction)
        .setTitle('Mensagens Removidas')
        .setDescription(`**${deletadas.size}** mensagem(ns) foram apagadas com sucesso.`)
        .addFields(
          { name: 'Canal',          value: `${interaction.channel}`, inline: true },
          { name: 'Moderador',      value: `${interaction.user}`,    inline: true },
        );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      const embed = createEmbed(interaction)
        .setTitle('Falha ao Remover Mensagens')
        .setDescription(
          'Não foi possível apagar as mensagens.\n' +
          '> Mensagens com mais de **14 dias** não podem ser apagadas em massa.\n' +
          '> Verifique se o bot possui a permissão **Gerenciar Mensagens**.',
        );
      await interaction.editReply({ embeds: [embed] });
      console.error('[/deletar]', err);
    }
  },
};
