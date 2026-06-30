// src/commands/moderation/aviso.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aviso')
    .setDescription('Dá um aviso verbal a um membro do servidor.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(opt =>
      opt
        .setName('membro')
        .setDescription('Membro que receberá o aviso.')
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('motivo')
        .setDescription('Motivo do aviso.')
        .setRequired(true)
        .setMaxLength(512),
    ),

  async execute(interaction) {
    const membro = interaction.options.getMember('membro');
    const motivo = interaction.options.getString('motivo');

    try {
      await interaction.deferReply();
    } catch {
      return;
    }

    if (!membro) {
      const embed = createEmbed(interaction)
        .setTitle('Membro Não Encontrado')
        .setDescription('O membro especificado não foi encontrado neste servidor.');
      return interaction.editReply({ embeds: [embed] });
    }

    if (membro.user.bot) {
      const embed = createEmbed(interaction)
        .setTitle('Ação Inválida')
        .setDescription('Não é possível emitir um aviso para um bot.');
      return interaction.editReply({ embeds: [embed] });
    }

    // Embed pública no canal
    const embedPublica = createEmbed(interaction)
      .setTitle('Aviso Emitido')
      .setDescription(`${membro} recebeu um aviso formal da moderação.`)
      .addFields(
        { name: 'Membro',    value: `${membro}`,          inline: true },
        { name: 'Moderador', value: `${interaction.user}`, inline: true },
        { name: 'Motivo',    value: motivo },
      );

    await interaction.editReply({ embeds: [embedPublica] });

    // Notificação por DM
    const embedDM = createEmbed(interaction.guild)
      .setTitle(`Você recebeu um aviso em ${interaction.guild.name}`)
      .setDescription('A moderação do servidor emitiu um aviso formal para você.')
      .addFields(
        { name: 'Motivo',    value: motivo },
        { name: 'Moderador', value: interaction.user.tag },
      );

    await membro.send({ embeds: [embedDM] }).catch(() => {});
  },
};
