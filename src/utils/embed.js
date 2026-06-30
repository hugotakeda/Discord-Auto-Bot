// src/utils/embed.js
// Utilitário central: toda embed do bot usa essa função para
// garantir timestamp, footer com nome+ícone do servidor e cor padrão.

const { EmbedBuilder } = require('discord.js');

const DEFAULT_COLOR = 0x24242a; // Cor padrão do servidor

/**
 * Cria uma EmbedBuilder pré-configurada com:
 *  - Cor padrão neutra
 *  - Timestamp atual
 *  - Footer com nome e ícone do servidor
 *
 * @param {import('discord.js').Interaction | import('discord.js').Guild} source
 *   Pode receber uma Interaction ou direto um Guild object
 * @returns {EmbedBuilder}
 */
function createEmbed(source) {
  // Se for uma interação, pega o guild. Se for passado direto o guild, usa ele.
  const guild = source && typeof source.iconURL === 'function' ? source : source?.guild;

  const embed = new EmbedBuilder()
    .setColor(DEFAULT_COLOR)
    .setTimestamp();

  if (guild && typeof guild.name === 'string') {
    embed.setFooter({
      text: guild.name,
      iconURL: typeof guild.iconURL === 'function' ? (guild.iconURL({ dynamic: true, size: 128 }) || undefined) : undefined,
    });
  }

  return embed;
}

module.exports = { createEmbed, DEFAULT_COLOR };
