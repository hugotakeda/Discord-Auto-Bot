// src/events/interactionCreate.js
// Roteia slash commands, botões, select menus e modais para seus handlers.
// Toda resposta usa try/catch para evitar crashes por interações expiradas.

const { createEmbed } = require('../utils/embed');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {

    // ── Slash Commands ──────────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(`[ERRO] Comando /${interaction.commandName}:`, err);

        // Só tenta responder se a interação ainda está válida
        if (interaction.isRepliable()) {
          const embed = createEmbed(interaction)
            .setTitle('Erro Interno')
            .setDescription('Ocorreu um erro ao executar este comando. Tente novamente.');
          const opts = { embeds: [embed], flags: 64 };
          await (interaction.deferred || interaction.replied
            ? interaction.followUp(opts)
            : interaction.reply(opts)
          ).catch(() => {});
        }
      }
      return;
    }

    // ── Botões ──────────────────────────────────────────────────────
    if (interaction.isButton()) {
      const [action] = interaction.customId.split(':');

      try {
        if (action === 'suggest_open')    return await require('../buttons/suggest_open').execute(interaction);
        if (action === 'suggest_up')      return await require('../buttons/suggest_vote').execute(interaction, 'up');
        if (action === 'suggest_down')    return await require('../buttons/suggest_vote').execute(interaction, 'down');
        if (action === 'suggest_approve') return await require('../buttons/suggest_approve').execute(interaction);
        if (action === 'suggest_reject')  return await require('../buttons/suggest_reject').execute(interaction);
        if (action === 'ticket_close')    return await require('../buttons/ticket_close').execute(interaction);
      } catch (err) {
        console.error(`[ERRO] Botão [${interaction.customId}]:`, err);
      }
      return;
    }

    // ── Select Menus ────────────────────────────────────────────────
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'ticket_category') {
        try {
          return await require('../buttons/ticket_create').execute(interaction);
        } catch (err) {
          console.error('[ERRO] Select Menu [ticket_category]:', err);
        }
      }
      return;
    }

    // ── Modais ──────────────────────────────────────────────────────
    if (interaction.isModalSubmit()) {
      try {
        if (interaction.customId.startsWith('modal_suggest'))
          return await require('../buttons/suggest_open').handleModal(interaction);
        if (interaction.customId.startsWith('modal_approve'))
          return await require('../buttons/suggest_approve').handleModal(interaction);
        if (interaction.customId.startsWith('modal_reject'))
          return await require('../buttons/suggest_reject').handleModal(interaction);
      } catch (err) {
        console.error(`[ERRO] Modal [${interaction.customId}]:`, err);
      }
    }
  },
};
