# Política de Privacidade — Auto Bot

**Última atualização:** 19 de junho de 2026

---

## 1. Introdução

Esta Política de Privacidade descreve como o **Auto Bot** ("Bot", "nós", "nosso") coleta, utiliza, armazena e protege as informações dos usuários ("você", "Usuário", "Membro") ao interagir com o Bot na plataforma Discord.

Ao adicionar o Bot a um servidor ou utilizar qualquer uma de suas funcionalidades, você declara que leu, compreendeu e concorda com as práticas descritas nesta Política. Caso não concorde, remova o Bot do servidor e cesse seu uso imediatamente.

Esta Política deve ser lida em conjunto com nossos [Termos de Serviço](TERMS_OF_SERVICE.md).

---

## 2. Informações que Coletamos

### 2.1 Dados Coletados Automaticamente

Durante a operação normal do Bot, os seguintes dados são processados automaticamente pela API do Discord:

| Dado | Finalidade | Armazenado? |
|---|---|---|
| ID do Usuário (Discord) | Identificar autores de sugestões, votos, tickets e alvos de ações de moderação | Sim, apenas no contexto de sugestões |
| ID do Servidor (Guild ID) | Direcionar funcionalidades ao servidor correto | Não |
| ID do Canal | Gerenciar tickets, sugestões e painéis | Não |
| Nome de Usuário e Tag | Exibir nos registros de moderação (embeds) e notificações por DM | Não |
| Conteúdo de Mensagens | Detectar links do Twitter/X para conversão automática | Não |

### 2.2 Dados Armazenados Persistentemente

O Bot armazena de forma persistente **apenas** os seguintes dados, em um arquivo JSON local:

- **Sugestões enviadas pelos membros:**
  - ID do autor da sugestão
  - Texto da sugestão
  - Contagem de votos (Upvote/Downvote)
  - IDs dos usuários que votaram (para evitar votos duplicados)
  - Status da sugestão (pendente, aprovada, reprovada)
  - Motivo da reprovação, quando aplicável

### 2.3 Dados que NÃO Coletamos

O Bot **não** coleta, armazena, processa ou transmite:

- Endereços de e-mail, números de telefone ou documentos pessoais.
- Senhas, tokens de autenticação ou credenciais de acesso.
- Dados de localização geográfica ou endereço IP.
- Informações financeiras, bancárias ou de pagamento.
- Conteúdo de mensagens diretas (DMs) entre usuários.
- Histórico completo de mensagens de canais.
- Dados biométricos ou informações sensíveis.
- Cookies, identificadores de dispositivo ou dados de rastreamento.

---

## 3. Como Utilizamos as Informações

As informações processadas pelo Bot são utilizadas exclusivamente para as seguintes finalidades:

### 3.1 Moderação do Servidor
- Executar ações de moderação solicitadas por moderadores autorizados (banimentos, castigos, avisos, exclusão de mensagens).
- Registrar o autor da ação e o membro afetado nas embeds públicas do servidor.
- Enviar notificações por DM aos membros que receberam ações de moderação.

### 3.2 Sistema de Sugestões
- Registrar sugestões enviadas por membros.
- Contabilizar votos e impedir votação duplicada.
- Notificar autores sobre o status de suas sugestões.

### 3.3 Sistema de Tickets
- Criar canais privados temporários para atendimento.
- Identificar o membro que abriu o ticket para atribuição de permissões no canal.

### 3.4 Conversão de Links
- Analisar o conteúdo de mensagens enviadas em canais de texto para detecção de links do Twitter/X.
- Substituir a mensagem original por uma versão com o link convertido para `vxtwitter.com`.
- **Nenhum conteúdo de mensagem é armazenado, registrado ou transmitido para servidores externos durante esse processo.** A análise é feita em tempo real e descartada imediatamente após o processamento.

### 3.5 Diagnóstico
- Registrar erros internos no console da aplicação para fins de depuração e manutenção. Esses registros podem conter IDs de usuários ou servidores, mas são limitados ao ambiente de hospedagem e não são compartilhados externamente.

---

## 4. Compartilhamento de Dados

### 4.1 Não Vendemos seus Dados
Nós **não vendemos, alugamos, licenciamos ou comercializamos** quaisquer dados dos usuários a terceiros, sob nenhuma circunstância.

### 4.2 Não Compartilhamos seus Dados
Os dados processados pelo Bot **não são compartilhados** com terceiros, exceto:

- **Discord**: Os dados transitam pela API do Discord conforme necessário para o funcionamento do Bot. O uso da API do Discord está sujeito à [Política de Privacidade do Discord](https://discord.com/privacy).
- **vxtwitter.com**: Links convertidos são redirecionados para o serviço vxtwitter.com. Nenhum dado pessoal é enviado a este serviço — apenas o link público convertido é incluído na mensagem.
- **Exigência legal**: Poderemos divulgar dados se exigido por lei, ordem judicial ou autoridade governamental competente.

### 4.3 Serviço de Hospedagem
O Bot é hospedado em infraestrutura de terceiros. Os dados armazenados localmente (arquivo de sugestões) residem no ambiente de hospedagem e estão sujeitos às políticas de segurança do provedor de hospedagem utilizado.

---

## 5. Armazenamento e Segurança dos Dados

### 5.1 Local de Armazenamento
Os dados persistentes são armazenados em arquivo local (JSON) no servidor de hospedagem do Bot. Não utilizamos bancos de dados externos, serviços em nuvem adicionais ou sistemas de armazenamento distribuído.

### 5.2 Medidas de Segurança
Adotamos as seguintes medidas para proteger os dados:

- Acesso restrito ao ambiente de hospedagem.
- Variáveis sensíveis (token do Bot, IDs de configuração) armazenadas em variáveis de ambiente, não expostas no código-fonte.
- Princípio de menor privilégio: o Bot solicita apenas as permissões estritamente necessárias para seu funcionamento.

### 5.3 Limitações
Apesar dos nossos esforços para proteger as informações, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro. Não podemos garantir segurança absoluta contra acessos não autorizados, alterações, divulgação ou destruição de dados.

---

## 6. Retenção de Dados

### 6.1 Período de Retenção
- **Dados de sugestões**: Mantidos enquanto o Bot estiver ativo e operacional no servidor. Não há exclusão automática programada.
- **Dados de moderação**: Não são armazenados pelo Bot. As embeds de moderação permanecem nos canais do Discord conforme as políticas de retenção do próprio Discord.
- **Dados de tickets**: Não são armazenados. Os canais de ticket são excluídos automaticamente quando fechados.
- **Dados de mensagens analisadas**: Processados em tempo real e descartados imediatamente. Nenhum conteúdo de mensagem é retido.

### 6.2 Exclusão de Dados
- Ao remover o Bot de um servidor, os dados de sugestões associados àquele servidor podem ser excluídos sem aviso prévio na próxima reinicialização ou manutenção do Bot.
- Você pode solicitar a exclusão dos seus dados entrando em contato conosco (veja a Seção 10).

---

## 7. Seus Direitos

Em conformidade com a **Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)** e outras legislações aplicáveis, você possui os seguintes direitos:

- **Acesso**: Solicitar informações sobre quais dados seus estão armazenados pelo Bot.
- **Correção**: Solicitar a correção de dados incompletos, inexatos ou desatualizados.
- **Exclusão**: Solicitar a eliminação dos seus dados pessoais armazenados pelo Bot.
- **Informação**: Ser informado sobre as entidades com as quais seus dados são compartilhados.
- **Revogação do consentimento**: Revogar o consentimento para o processamento dos seus dados a qualquer momento.
- **Portabilidade**: Solicitar a transferência dos seus dados a outro prestador de serviço, quando aplicável.

Para exercer qualquer um desses direitos, entre em contato conosco conforme descrito na Seção 10.

### 7.1 Prazo de Resposta
Nos comprometemos a responder a todas as solicitações relacionadas a direitos de privacidade em até **15 (quinze) dias úteis** a partir do recebimento da solicitação.

---

## 8. Menores de Idade

O Bot não coleta intencionalmente dados de menores de 13 anos. Se tomarmos conhecimento de que dados de um menor de 13 anos foram coletados inadvertidamente, tomaremos medidas para excluí-los imediatamente.

O uso do Bot por menores de 18 anos deve ser supervisionado por um responsável legal, em conformidade com o Estatuto da Criança e do Adolescente (ECA) e a LGPD.

---

## 9. Alterações nesta Política

Reservamo-nos o direito de atualizar ou modificar esta Política de Privacidade a qualquer momento. Alterações significativas serão comunicadas, quando possível, através do servidor oficial de suporte no Discord.

A data de "Última atualização" no topo deste documento será revisada sempre que houver modificações. O uso continuado do Bot após a publicação de alterações constitui aceitação da Política atualizada.

Recomendamos que você revise esta Política periodicamente para se manter informado sobre como protegemos suas informações.

---

## 10. Contato

Para dúvidas, solicitações de acesso, correção ou exclusão de dados, ou qualquer questão relacionada a esta Política de Privacidade, entre em contato conosco através do:

- **Servidor oficial de suporte no Discord**

Todas as solicitações serão analisadas e respondidas dentro do prazo estabelecido na Seção 7.1.

---

## 11. Conformidade Legal

Esta Política de Privacidade foi elaborada em conformidade com:

- **Lei Geral de Proteção de Dados (LGPD)** — Lei nº 13.709/2018 (Brasil)
- **Termos de Serviço do Discord** — [discord.com/terms](https://discord.com/terms)
- **Política de Privacidade do Discord** — [discord.com/privacy](https://discord.com/privacy)
- **Política de Desenvolvedores do Discord** — [discord.com/developers/docs/policies-and-agreements](https://discord.com/developers/docs/policies-and-agreements)

---

## 12. Disposições Finais

- Esta Política é regida pelas leis da República Federativa do Brasil.
- Em caso de conflito entre esta Política e os Termos de Serviço do Bot, prevalecerão os Termos de Serviço no que diz respeito às obrigações do Usuário, e esta Política no que diz respeito ao tratamento de dados pessoais.
- Quaisquer disputas serão submetidas ao foro da comarca do domicílio do desenvolvedor, com exclusão de qualquer outro, por mais privilegiado que seja.

---

*Ao utilizar o Auto Bot, você confirma que leu, compreendeu e concorda com esta Política de Privacidade.*
