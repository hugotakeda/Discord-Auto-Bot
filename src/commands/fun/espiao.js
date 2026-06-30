const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embed');

const LOCATIONS = [
  { name: 'Hospital', roles: ['Médico', 'Enfermeiro(a)', 'Paciente', 'Cirurgião', 'Recepcionista', 'Anestesista', 'Visitante'] },
  { name: 'Estação Espacial', roles: ['Astronauta', 'Engenheiro', 'Comandante', 'Cientista', 'Turista Espacial', 'Piloto'] },
  { name: 'Submarino', roles: ['Capitão', 'Marinheiro', 'Cozinheiro', 'Mergulhador', 'Técnico de Sonar', 'Navegador'] },
  { name: 'Escola', roles: ['Professor', 'Diretor', 'Aluno', 'Inspetor', 'Cozinheiro', 'Faxineiro', 'Bibliotecário'] },
  { name: 'Base Militar', roles: ['General', 'Soldado', 'Atirador', 'Sargento', 'Médico do Exército', 'Piloto de Caça'] },
  { name: 'Cassino', roles: ['Crupiê', 'Apostador', 'Gerente', 'Segurança', 'Garçom', 'Ilusionista'] },
  { name: 'Circo', roles: ['Palhaço', 'Mágico', 'Acrobata', 'Domador de Leões', 'Malabarista', 'Diretor do Circo'] },
  { name: 'Avião de Passageiros', roles: ['Piloto', 'Comissário(a)', 'Passageiro Primeira Classe', 'Passageiro Econômica', 'Mecânico de Voo', 'Agente Aéreo'] },
  { name: 'Navio Pirata', roles: ['Capitão Pirata', 'Imediato', 'Canhoneiro', 'Marujo', 'Prisioneiro', 'Cozinheiro do Navio'] },
  { name: 'Estúdio de Cinema', roles: ['Diretor', 'Ator Principal', 'Figurante', 'Câmera', 'Maquiador', 'Dublê', 'Produtor'] },
  { name: 'Restaurante', roles: ['Chef', 'Sub-chef', 'Garçom', 'Maitre', 'Cliente Crítico', 'Sommelier', 'Lavador de Pratos'] },
  { name: 'Delegacia', roles: ['Delegado', 'Detetive', 'Policial', 'Suspeito', 'Testemunha', 'Advogado'] },
  { name: 'Zoológico', roles: ['Veterinário', 'Tratador de Animais', 'Visitante', 'Biólogo', 'Segurança', 'Guia Turístico'] },
  { name: 'Spa', roles: ['Massagista', 'Cliente', 'Recepcionista', 'Esteticista', 'Dermatologista', 'Instrutor de Yoga'] },
  { name: 'Banco', roles: ['Gerente', 'Caixa', 'Segurança', 'Cliente', 'Assessor de Investimentos', 'Ladrão Disfarçado'] },
  { name: 'Supermercado', roles: ['Caixa', 'Açougueiro', 'Empacotador', 'Cliente', 'Gerente', 'Estoquista'] },
  { name: 'Museu', roles: ['Curador', 'Guia', 'Turista', 'Segurança', 'Restaurador de Obras', 'Estudante de Arte'] },
  { name: 'Teatro', roles: ['Ator', 'Diretor de Palco', 'Espectador', 'Figurinista', 'Iluminador', 'Bilheteiro'] },
  { name: 'Cruzeiro', roles: ['Capitão', 'Passageiro VIP', 'Passageiro Comum', 'Camareira', 'Músico da Banda', 'Barman'] },
  { name: 'Embaixada', roles: ['Embaixador', 'Diplomata', 'Segurança', 'Secretário', 'Turista', 'Espião Rival'] }
];

const WORDS = [
  ['Maçã', 'Pera'], ['Carro', 'Moto'], ['Gato', 'Cachorro'], ['Praia', 'Piscina'],
  ['Futebol', 'Basquete'], ['Violão', 'Guitarra'], ['Cinema', 'Teatro'],
  ['Trem', 'Metrô'], ['Café', 'Chá'], ['Sol', 'Lua'],
  ['Rio', 'Mar'], ['Chocolate', 'Morango'], ['Camisa', 'Jaqueta'],
  ['Cerveja', 'Vinho'], ['Pizza', 'Hambúrguer'], ['Avião', 'Helicóptero'],
  ['Livro', 'Revista'], ['Celular', 'Tablet'], ['Tênis', 'Sapato'],
  ['Calor', 'Frio'], ['Água', 'Refrigerante'], ['Dia', 'Noite'],
  ['Primavera', 'Outono'], ['Bicicleta', 'Patinete'], ['Montanha', 'Floresta'],
  ['Faca', 'Colher'], ['Cadeira', 'Sofá'], ['Papel', 'Caderno'],
  ['Relógio', 'Pulseira'], ['Ouro', 'Prata'], ['Neve', 'Chuva'],
  ['Leão', 'Tigre'], ['Cobra', 'Aranha'], ['Computador', 'Notebook'],
  ['Sorvete', 'Bolo'], ['Salgadinho', 'Pipoca'], ['Ovo', 'Queijo'],
  ['Sopa', 'Caldo'], ['Pão', 'Biscoito'], ['Suco', 'Vitamina'],
  ['Dinheiro', 'Cartão'], ['Lápis', 'Caneta'], ['Copo', 'Xícara'],
  ['Espelho', 'Vidro'], ['Janela', 'Porta'], ['Chave', 'Fechadura']
];

function replyError(i, message) {
  if (i.deferred || i.replied) {
    return i.followUp({ embeds: [createEmbed(i).setDescription(message)], ephemeral: true });
  }
  return i.reply({ embeds: [createEmbed(i).setDescription(message)], ephemeral: true });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('espiao')
    .setDescription('Inicia uma partida do jogo Espião (Spyfall/Undercover)')
    .addStringOption(option =>
      option.setName('modo')
        .setDescription('Escolha o modo de jogo')
        .setRequired(true)
        .addChoices(
          { name: 'Localização (Spyfall)', value: 'local' },
          { name: 'Palavras Secretas (Undercover)', value: 'palavra' }
        )),

  async execute(interaction) {
    const modo = interaction.options.getString('modo');
    const host = interaction.user;
    
    // Obter o canal de voz do host
    const voiceChannel = interaction.member?.voice?.channel;
    if (!voiceChannel) {
      return replyError(interaction, 'Você precisa estar em um canal de voz para iniciar o jogo!');
    }

    // Filtrar todos os membros do canal de voz (ignorando bots)
    const playersCollection = voiceChannel.members.filter(m => !m.user.bot);
    if (playersCollection.size < 3) {
      return replyError(interaction, `É necessário ter pelo menos 3 pessoas no canal de voz (**${voiceChannel.name}**) para jogar.`);
    }

    // Informar que estamos preparando a partida
    await interaction.deferReply();

    const playersArray = Array.from(playersCollection.values());
    const players = new Set(playersArray.map(m => m.id));
    
    // Configurações e papéis
    let secretData = {};
    const playerRoles = new Map();
    const spyId = playersArray[Math.floor(Math.random() * playersArray.length)].id;

    if (modo === 'local') {
      const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      secretData.location = loc.name;
      for (const player of playersArray) {
         if (player.id !== spyId) {
            const randomRole = loc.roles[Math.floor(Math.random() * loc.roles.length)];
            playerRoles.set(player.id, randomRole);
         }
      }
    } else {
      const pair = WORDS[Math.floor(Math.random() * WORDS.length)];
      if (Math.random() > 0.5) {
        secretData.word = pair[0];
        secretData.spyWord = pair[1];
      } else {
        secretData.word = pair[1];
        secretData.spyWord = pair[0];
      }
      secretData.isMrWhite = Math.random() < 0.3;
    }

    // Enviar DMs
    const failedDMs = [];
    await Promise.all(playersArray.map(async (member) => {
      let msg = '';
      const isSpy = member.id === spyId;

      if (modo === 'local') {
        if (isSpy) {
          msg = '**Você é o ESPIÃO!**\nVocê não sabe onde está. Tente descobrir a localização ouvindo as perguntas dos outros e se misture.';
        } else {
          const role = playerRoles.get(member.id);
          msg = `**A Localização é:** \`${secretData.location}\`\n\n**Sua Profissão:** \`${role}\`\nInterprete seu papel ou apenas use isso de base para suas perguntas.`;
        }
      } else {
        if (isSpy) {
          if (secretData.isMrWhite) {
            msg = '**Você é o SR. BRANCO (Espião)!**\nVocê não recebeu nenhuma palavra. Preste muita atenção no que os outros disserem e tente se camuflar.';
          } else {
            msg = `**Sua palavra é:** \`${secretData.spyWord}\`\n(Nota: Você pode ser o Infiltrado! A palavra da maioria pode ser um pouco diferente da sua. Descubra e se adapte.)`;
          }
        } else {
          msg = `**Sua palavra é:** \`${secretData.word}\`\n(Dica: Tente encontrar quem é do seu time com palavras similares e desmascare o espião/infiltrado.)`;
        }
      }

      try {
        await member.send({ embeds: [createEmbed(interaction).setDescription(msg)] });
      } catch (err) {
        failedDMs.push(member);
      }
    }));

    // Se houve falha no envio das DMs
    if (failedDMs.length > 0) {
      const mentions = failedDMs.map(m => `<@${m.id}>`).join(', ');
      return interaction.editReply({
        embeds: [
          createEmbed(interaction)
            .setTitle('Erro ao iniciar a partida')
            .setDescription(`A partida foi cancelada porque os seguintes jogadores estão com as Mensagens Diretas desativadas: ${mentions}.\n\nPor favor, ativem as mensagens diretas nas configurações de privacidade e tentem novamente.`)
        ]
      });
    }

    // Sucesso! Jogo rolando
    const gameEmbed = createEmbed(interaction)
      .setTitle(`Jogo Espião: ${modo === 'local' ? 'Localização' : 'Palavras Secretas'}`)
      .setDescription(`O jogo começou! Todos os papéis foram enviados via DM.\nDiscutam no canal de voz e, quando estiverem prontos, iniciem a votação.\n\n**Jogadores Participantes:**\n<@${playersArray.map(m => m.id).join('>\n<@')}>`);

    const gameButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('espiao_iniciar_votacao').setLabel('Iniciar Votação').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('espiao_cancelar').setLabel('Cancelar Partida').setStyle(ButtonStyle.Secondary)
    );

    const response = await interaction.editReply({ embeds: [gameEmbed], components: [gameButtons] });
    const collector = response.createMessageComponentCollector({ time: 3600000 });

    let votes = new Map();

    collector.on('collect', async (i) => {
      
      // Iniciar Votação
      if (i.customId === 'espiao_iniciar_votacao') {
        if (i.user.id !== host.id) return replyError(i, 'Apenas o host pode iniciar a votação.');
        
        const options = playersArray.map(m => ({
          label: m.displayName || m.user.username,
          value: m.id
        }));

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId('espiao_votar')
          .setPlaceholder('Escolha quem você acha que é o espião')
          .addOptions(options);

        const row1 = new ActionRowBuilder().addComponents(selectMenu);
        const row2 = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('espiao_encerrar').setLabel('Encerrar Votação e Revelar').setStyle(ButtonStyle.Danger)
        );

        const voteEmbed = createEmbed(interaction)
          .setTitle('Hora da Votação')
          .setDescription(`Todos devem votar em quem suspeitam ser o espião!\n\n**Votos recebidos:** 0/${playersArray.length}`);

        await i.update({ embeds: [voteEmbed], components: [row1, row2] });
      }

      // Votar
      else if (i.customId === 'espiao_votar') {
        if (!players.has(i.user.id)) return replyError(i, 'Você não está participando desta partida.');
        
        const votedId = i.values[0];
        votes.set(i.user.id, votedId);
        
        const voteEmbed = createEmbed(interaction)
          .setTitle('Hora da Votação')
          .setDescription(`Todos devem votar em quem suspeitam ser o espião!\n\n**Votos recebidos:** ${votes.size}/${playersArray.length}`);

        // O Select Menu mantém o estado do usuário, então atualizamos a mensagem
        await i.update({ embeds: [voteEmbed] });
      }

      // Cancelar Partida
      else if (i.customId === 'espiao_cancelar') {
        if (i.user.id !== host.id) return replyError(i, 'Apenas o host pode cancelar a partida.');

        collector.stop('cancelled');
        await i.update({ 
          embeds: [createEmbed(interaction).setDescription('Partida cancelada pelo host.')], 
          components: [] 
        });
      }

      // Encerrar Votação e Revelar
      else if (i.customId === 'espiao_encerrar') {
        if (i.user.id !== host.id) return replyError(i, 'Apenas o host pode encerrar a votação.');
        
        // Contar os votos
        const tally = {};
        for (const [voter, voted] of votes.entries()) {
          tally[voted] = (tally[voted] || 0) + 1;
        }
        
        let maxVotes = 0;
        let mostVoted = [];
        for (const [candidate, count] of Object.entries(tally)) {
          if (count > maxVotes) {
            maxVotes = count;
            mostVoted = [candidate];
          } else if (count === maxVotes) {
            mostVoted.push(candidate);
          }
        }

        let revealMsg = `**Fim de jogo!**\n\n`;

        if (votes.size === 0) {
           revealMsg += `Ninguém votou.\n\n`;
        } else {
           const votedMentions = mostVoted.map(id => `<@${id}>`).join(', ');
           revealMsg += `**Resultado da Votação:**\nQuem recebeu mais votos (${maxVotes} votos) foi: ${votedMentions}\n\n`;
        }

        revealMsg += `**A Verdade:**\nO espião era: <@${spyId}>\n`;

        if (modo === 'local') {
          revealMsg += `A localização verdadeira era: **${secretData.location}**`;
        } else {
          revealMsg += `A palavra dos Cidadãos era: **${secretData.word}**\n`;
          if (secretData.isMrWhite) {
            revealMsg += `O espião era o Sr. Branco (não tinha palavra).`;
          } else {
            revealMsg += `A palavra do Infiltrado era: **${secretData.spyWord}**`;
          }
        }

        const endEmbed = createEmbed(interaction)
          .setTitle('Jogo Encerrado')
          .setDescription(revealMsg);

        await i.update({ embeds: [endEmbed], components: [] });
        collector.stop('ended');
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        interaction.editReply({ components: [] }).catch(() => { });
      }
    });
  },
};
