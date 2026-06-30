// src/events/messageCreate.js
// Monitora mensagens e converte links do Twitter/X para vxtwitter.com
//
// O link convertido é enviado como CONTEÚDO PURO usando hyperlink
// para não interferir na geração do preview nativo do Discord.

const TWITTER_REGEX = /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+\/status\/\d+[^\s]*)/gi;

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const matches = [...message.content.matchAll(TWITTER_REGEX)];
    if (matches.length === 0) return;

    // Mapeia cada link encontrado para o formato de hyperlink do Discord
    const linhas = matches.map(m => {
      const link = `https://vxtwitter.com/${m[1]}`;
      return `O membro ${message.author} enviou um [vxtwitter](${link})`;
    });

    // Envia o conteúdo apenas com texto (sem embeds), assim o Discord carrega o preview do link
    const payload = {
      content: linhas.join('\n\n'),
      allowedMentions: { parse: [] }, // não notifica o autor mencionado de novo
    };

    await message.channel.send(payload).catch(err =>
      console.error('[messageCreate] Falha ao enviar no canal:', err.message)
    );

    // Apaga a mensagem original do membro após enviar o link convertido
    await message.delete().catch(err =>
      console.error('[messageCreate] Falha ao apagar mensagem original:', err.message)
    );
  },
};
