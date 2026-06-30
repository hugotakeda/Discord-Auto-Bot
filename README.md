# Auto Bot Discord

Auto Bot é um bot multifuncional e profissional para Discord, focado em otimizar a gestão da sua comunidade. Oferece moderação avançada, painéis interativos de tickets e sugestões, além de um sistema inteligente para conversão automática de links do Twitter/X, garantindo que vídeos e mídias sejam visualizados diretamente no chat.

---

## Requisitos

- **Node.js** 18 ou superior
- **Uma aplicação** criada no [Discord Developer Portal](https://discord.com/developers/applications)

---

## Configuração

### 1. Clone o repositório e instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
TOKEN=seu_token_aqui
CLIENT_ID=id_do_bot_aqui
GUILD_ID=id_do_servidor_aqui   # Deixe em branco para registrar comandos globalmente
```

> **Como obter os valores:**
> - `TOKEN` e `CLIENT_ID`: [Discord Developer Portal](https://discord.com/developers/applications) → sua aplicação → Bot / General Information
> - `GUILD_ID`: No Discord, ative o Modo de Desenvolvedor (Configurações → Avançado) e clique com o botão direito no servidor → Copiar ID

### 3. Registre os slash commands

```bash
npm run deploy
```

### 4. Inicie o bot

```bash
npm start
```

---

## Permissões necessárias para o bot

Ao convidar o bot, certifique-se de conceder as seguintes permissões:

- `Gerenciar Mensagens`
- `Banir Membros`
- `Silenciar Membros` (ModerateMembers)
- `Gerenciar Canais`
- `Ler Mensagens / Ver Canais`
- `Enviar Mensagens`
- `Incorporar Links`
- `Ler Histórico de Mensagens`

---

## Comandos

| Comando | Descrição | Permissão |
|---|---|---|
| `/ping` | Latência do bot (WebSocket + API) | Todos |
| `/deletar` | Apaga até 100 mensagens do canal | Gerenciar Mensagens |
| `/anunciar` | Envia um anúncio em um canal específico | Gerenciar Servidor |
| `/aviso` | Avisa verbalmente um membro | Silenciar Membros |
| `/ban` | Bane um membro do servidor | Banir Membros |
| `/castigo` | Aplica timeout em um membro | Silenciar Membros |
| `/painel-sugerir` | Cria o painel de sugestões | Gerenciar Servidor |
| `/painel-ticket` | Cria o painel de tickets | Gerenciar Servidor |

---

## Conversão automática de links do Twitter

Sempre que um membro enviar um link `x.com` ou `twitter.com`, o bot responde automaticamente com o link convertido para `vxtwitter.com`, permitindo a visualização de mídias embutidas.

**Exemplo:**
> `https://x.com/usuario/status/123` → `https://vxtwitter.com/usuario/status/123`

---

## Painel de Sugestões — Fluxo

1. Admin usa `/painel-sugerir` no canal desejado
2. Membro clica em **Enviar Sugestão** → preenche o modal
3. Bot posta a embed com contadores de **Upvote** / **Downvote**
4. Admin clica em **Reprovar** → informa o motivo
5. Embed é atualizada com o status "Reprovada" e o motivo
6. Membro recebe notificação por DM

---

## Painel de Tickets — Fluxo

1. Admin usa `/painel-ticket` informando as categorias desejadas
2. Membro seleciona uma categoria no menu
3. Bot cria um canal privado visível apenas pelo membro e pela equipe
4. Membro clica em **Fechar Ticket** → canal é deletado após 5 segundos

---

## Estrutura do Projeto

```
src/
├── index.js                  # Entry point
├── deploy-commands.js        # Registra slash commands
├── config.js                 # Variáveis de ambiente
├── commands/
│   ├── moderation/           # deletar, anunciar, aviso, ban, castigo
│   ├── utility/              # ping
│   └── panels/               # painel-sugerir, painel-ticket
├── events/
│   ├── ready.js
│   ├── interactionCreate.js
│   └── messageCreate.js      # Conversão Twitter
├── buttons/
│   ├── suggest_open.js
│   ├── suggest_vote.js
│   ├── suggest_reject.js
│   ├── ticket_create.js
│   └── ticket_close.js
├── handlers/
│   ├── commandHandler.js
│   └── eventHandler.js
└── utils/
    ├── embed.js              # Cria embeds com timestamp + footer do servidor
    └── suggestionsDB.js      # Persistência local em JSON
data/
└── suggestions.json
```
