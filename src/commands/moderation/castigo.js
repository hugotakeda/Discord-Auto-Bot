// src/commands/moderation/castigo.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

function formatDuracao(min) {
  if (min < 60)   return `${min} minuto(s)`;
  if (min < 1440) return `${Math.floor(min / 60)}h ${min % 60 > 0 ? `${min % 60}min` : ''}`.trim();
  return `${Math.floor(min / 1440)} dia(s)`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('castigo')
    .setDescription('Silencia temporariamente um membro (timeout).')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(opt =>
      opt
        .setName('membro')
        .setDescription('Membro a ser silenciado.')
        .setRequired(true),
    )
    .addIntegerOption(opt =>
      opt
        .setName('duracao')
        .setDescription('Duração em minutos (1–40320 = 28 dias).')
        .setMinValue(1)
        .setMaxValue(40320)
        .setRequired(true),
    )
    .addStringOption(opt =>
      opt
        .setName('motivo')
        .setDescription('Motivo do castigo.')
        .setRequired(false)
        .setMaxLength(512),
    ),

  async execute(interaction) {
    const alvo    = interaction.options.getMember('membro');
    const duracao = interaction.options.getInteger('duracao');
    const motivo  = interaction.options.getString('motivo') ?? 'Nenhum motivo fornecido.';

    await interaction.deferReply();

    if (!alvo) {
      const embed = createEmbed(interaction)
        .setTitle('Membro Não Encontrado')
        .setDescription('O membro especificado não foi encontrado neste servidor.');
      return interaction.editReply({ embeds: [embed] });
    }

    if (!alvo.moderatable) {
      const embed = createEmbed(interaction)
        .setTitle('Ação Não Permitida')
        .setDescription(
          'Não foi possível aplicar castigo neste membro.\n' +
          '> O cargo do bot precisa ser **superior** ao cargo do membro.',
        );
      return interaction.editReply({ embeds: [embed] });
    }

    try {
      await alvo.timeout(duracao * 60 * 1000, motivo);

      // DM ao membro
      const embedDM = createEmbed(interaction.guild)
        .setTitle(`Você recebeu um castigo em ${interaction.guild.name}`)
        .addFields(
          { name: 'Duração',   value: formatDuracao(duracao) },
          { name: 'Motivo',    value: motivo },
          { name: 'Moderador', value: interaction.user.tag },
        );
      await alvo.send({ embeds: [embedDM] }).catch(() => {});

      // Resposta pública
      const embed = createEmbed(interaction)
        .setTitle('Castigo Aplicado')
        .setDescription(`${alvo} foi silenciado por **${formatDuracao(duracao)}**.`)
        .addFields(
          { name: 'Membro',    value: `${alvo}`,             inline: true },
          { name: 'Moderador', value: `${interaction.user}`,  inline: true },
          { name: 'Duração',   value: formatDuracao(duracao), inline: true },
          { name: 'Motivo',    value: motivo },
        );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      const embed = createEmbed(interaction)
        .setTitle('Falha ao Aplicar Castigo')
        .setDescription('Não foi possível silenciar o membro. Verifique as permissões do bot.');
      await interaction.editReply({ embeds: [embed] });
      console.error('[/castigo]', err);
    }
  },
};
