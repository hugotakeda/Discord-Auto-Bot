// src/commands/moderation/ban.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bane um membro do servidor permanentemente.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(opt =>
      opt
        .setName('membro')
        .setDescription('Membro a ser banido.')
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('motivo')
        .setDescription('Motivo do banimento.')
        .setRequired(false)
        .setMaxLength(512),
    )
    .addIntegerOption(opt =>
      opt
        .setName('dias')
        .setDescription('Dias de mensagens a apagar (0–7). Padrão: 0.')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false),
    ),

  async execute(interaction) {
    const alvo   = interaction.options.getMember('membro');
    const motivo = interaction.options.getString('motivo') ?? 'Nenhum motivo fornecido.';
    const dias   = interaction.options.getInteger('dias')  ?? 0;

    await interaction.deferReply();

    if (!alvo) {
      const embed = createEmbed(interaction)
        .setTitle('Membro Não Encontrado')
        .setDescription('O membro especificado não foi encontrado neste servidor.');
      return interaction.editReply({ embeds: [embed] });
    }

    if (!alvo.bannable) {
      const embed = createEmbed(interaction)
        .setTitle('Ação Não Permitida')
        .setDescription(
          'Não foi possível banir este membro.\n' +
          '> O cargo do bot precisa ser **superior** ao cargo do membro.',
        );
      return interaction.editReply({ embeds: [embed] });
    }

    // DM antes do banimento
    const embedDM = createEmbed(interaction.guild)
      .setTitle(`Você foi banido de ${interaction.guild.name}`)
      .addFields(
        { name: 'Motivo',    value: motivo },
        { name: 'Moderador', value: interaction.user.tag },
      );
    await alvo.send({ embeds: [embedDM] }).catch(() => {});

    try {
      await alvo.ban({ reason: motivo, deleteMessageSeconds: dias * 86400 });

      const embed = createEmbed(interaction)
        .setTitle('Membro Banido')
        .setDescription(`**${alvo.user.tag}** foi banido do servidor.`)
        .addFields(
          { name: 'Membro',            value: `${alvo.user.tag}`,   inline: true },
          { name: 'Moderador',         value: `${interaction.user}`, inline: true },
          { name: 'Mensagens apagadas', value: `${dias} dia(s)`,    inline: true },
          { name: 'Motivo',            value: motivo },
        );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      const embed = createEmbed(interaction)
        .setTitle('Falha ao Banir')
        .setDescription('Não foi possível banir o membro. Verifique as permissões do bot.');
      await interaction.editReply({ embeds: [embed] });
      console.error('[/ban]', err);
    }
  },
};
