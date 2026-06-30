# Termos de Serviço — Auto Bot

**Última atualização:** 19 de junho de 2026

---

## 1. Aceitação dos Termos

Ao adicionar, configurar ou utilizar o **Auto Bot** ("Bot") em qualquer servidor do Discord ("Servidor"), você ("Usuário", "Administrador" ou "Membro") concorda integralmente com estes Termos de Serviço ("Termos"). Caso não concorde com qualquer disposição aqui descrita, você deve remover o Bot do Servidor imediatamente e cessar seu uso.

Estes Termos se aplicam a todos os usuários que interagem com o Bot, incluindo administradores que o configuram e membros que utilizam suas funcionalidades.

---

## 2. Descrição do Serviço

O Auto Bot é um bot para a plataforma Discord que oferece as seguintes funcionalidades:

### 2.1 Moderação
- **Banimento de membros** (`/ban`): Permite que moderadores autorizados removam permanentemente membros do servidor.
- **Castigo/Timeout** (`/castigo`): Aplica silenciamento temporário a membros por um período determinado.
- **Aviso verbal** (`/aviso`): Emite avisos formais a membros com registro público e notificação privada por mensagem direta (DM).
- **Exclusão de mensagens em massa** (`/deletar`): Remove até 100 mensagens de um canal de texto.
- **Anúncios** (`/anunciar`): Publica comunicados oficiais em canais específicos do servidor.

### 2.2 Sistema de Sugestões
- Painel interativo para coleta de sugestões dos membros do servidor.
- Sistema de votação com contagem de votos favoráveis e contrários (Upvote/Downvote).
- Aprovação e reprovação de sugestões pela equipe de administração com registro de motivo.
- Notificação automática aos autores via mensagem direta (DM).

### 2.3 Sistema de Tickets
- Painel com menu de categorias personalizáveis para abertura de tickets.
- Criação automática de canais privados para atendimento individualizado.
- Fechamento de tickets com exclusão automática do canal após confirmação.

### 2.4 Conversão Automática de Links
- Detecção automática de links do Twitter/X (`x.com` e `twitter.com`) em mensagens de membros.
- Conversão para o formato `vxtwitter.com` para melhor visualização de mídias incorporadas.
- Exclusão automática da mensagem original do membro após a conversão e envio do link corrigido.

### 2.5 Utilidades
- **Ping** (`/ping`): Exibe a latência do Bot (WebSocket e API).

---

## 3. Elegibilidade

Para utilizar o Bot, você deve:

- Possuir uma conta válida e ativa no Discord.
- Cumprir os [Termos de Serviço do Discord](https://discord.com/terms).
- Cumprir as [Diretrizes da Comunidade do Discord](https://discord.com/guidelines).
- Ter idade mínima de 13 anos ou a idade mínima exigida pela legislação do seu país para uso de serviços digitais.

---

## 4. Permissões e Acesso

### 4.1 Permissões do Bot
Para funcionar corretamente, o Bot requer as seguintes permissões no servidor:

- Gerenciar Mensagens
- Banir Membros
- Silenciar Membros (Moderate Members)
- Gerenciar Canais
- Ler Mensagens / Ver Canais
- Enviar Mensagens
- Incorporar Links (Embed Links)
- Ler Histórico de Mensagens

### 4.2 Responsabilidade do Administrador
O administrador do servidor é integralmente responsável por:

- Configurar corretamente as permissões do Bot.
- Garantir que os moderadores utilizem os comandos de forma ética e em conformidade com as regras do servidor e do Discord.
- Informar os membros do servidor sobre a presença e funcionamento do Bot.

---

## 5. Coleta e Uso de Dados

### 5.1 Dados Processados
O Bot processa os seguintes dados durante sua operação:

- **Conteúdo de mensagens**: Apenas para detecção de links do Twitter/X. O conteúdo das mensagens não é armazenado.
- **Identificadores de usuário** (IDs do Discord): Utilizados para identificar autores de sugestões, votos, tickets e para execução de comandos de moderação.
- **Identificadores de servidor e canal**: Necessários para o funcionamento dos painéis de sugestões e tickets.
- **Sugestões enviadas**: Armazenadas localmente em arquivo JSON para persistência do sistema de sugestões (texto da sugestão, ID do autor e contagem de votos).

### 5.2 Dados Não Coletados
O Bot **não** coleta, armazena ou transmite:

- Senhas ou credenciais de qualquer natureza.
- Dados pessoais além dos IDs públicos fornecidos pela API do Discord.
- Conteúdo de mensagens privadas (DMs) entre usuários.
- Informações financeiras ou de pagamento.
- Dados de localização geográfica.

### 5.3 Armazenamento e Retenção
- Os dados de sugestões são armazenados localmente no servidor onde o Bot está hospedado.
- Nenhum dado é vendido, compartilhado com terceiros ou utilizado para fins publicitários.
- Os dados são retidos enquanto o Bot estiver ativo no servidor. Ao remover o Bot, os dados armazenados localmente podem ser eliminados sem aviso prévio.

### 5.4 Serviços de Terceiros
O Bot utiliza o serviço **vxtwitter.com** exclusivamente para conversão de links do Twitter/X. O Bot não possui vínculo, parceria ou afiliação com o vxtwitter.com, Twitter, X Corp. ou quaisquer de suas subsidiárias. O uso desses serviços está sujeito aos respectivos termos de cada plataforma.

---

## 6. Uso Aceitável

Ao utilizar o Bot, você concorda em **não**:

- Utilizar os comandos de moderação de forma abusiva, discriminatória ou em violação às diretrizes do Discord.
- Tentar explorar, manipular ou abusar das funcionalidades do Bot para fins ilícitos.
- Sobrecarregar o Bot com requisições excessivas ou automatizadas (spam).
- Utilizar o Bot para assédio, intimidação ou perseguição de outros usuários.
- Tentar obter acesso não autorizado ao código-fonte, infraestrutura ou dados do Bot.
- Utilizar o Bot em servidores que promovam atividades ilegais ou que violem os Termos de Serviço do Discord.

---

## 7. Modificação e Exclusão Automática de Mensagens

Ao utilizar o Bot em um servidor, os membros reconhecem e concordam que:

- Mensagens contendo links do Twitter/X (`x.com` ou `twitter.com`) serão **automaticamente excluídas** pelo Bot após o envio da versão convertida do link.
- O Bot enviará uma nova mensagem com o link convertido, mencionando o autor original.
- Esta funcionalidade opera automaticamente e não pode ser desativada por membros individuais — apenas por administradores ao remover o Bot ou revogar suas permissões.

---

## 8. Notificações por Mensagem Direta (DM)

O Bot poderá enviar mensagens diretas aos membros do servidor nas seguintes situações:

- Quando um membro receber um aviso formal da moderação.
- Quando um membro receber um castigo (timeout).
- Quando um membro for banido do servidor.
- Quando uma sugestão enviada por um membro for reprovada.

Caso o membro tenha suas DMs desabilitadas ou tenha bloqueado o Bot, a notificação não será entregue. O Bot não tentará contornar essas restrições.

---

## 9. Isenção de Garantias

O Bot é fornecido **"no estado em que se encontra" ("as is")** e **"conforme disponível" ("as available")**, sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a:

- Garantias de disponibilidade ininterrupta ou livre de erros.
- Garantias de que o Bot atenderá a todas as necessidades ou expectativas do Usuário.
- Garantias de compatibilidade com futuras atualizações da plataforma Discord ou de sua API.

---

## 10. Limitação de Responsabilidade

Em nenhuma hipótese o desenvolvedor do Bot será responsável por:

- Danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou da impossibilidade de uso do Bot.
- Perdas de dados, interrupções de serviço ou falhas de comunicação.
- Ações tomadas por moderadores ou administradores do servidor utilizando os comandos do Bot (banimentos, castigos, avisos, exclusão de mensagens).
- Conteúdo gerado, enviado ou compartilhado por usuários através das funcionalidades do Bot (sugestões, tickets).
- Indisponibilidade de serviços de terceiros utilizados pelo Bot (Discord API, vxtwitter.com).

---

## 11. Conduta de Moderadores

Os comandos de moderação do Bot são ferramentas à disposição da equipe de administração do servidor. A responsabilidade pelo uso adequado, justo e ético dessas ferramentas é exclusivamente dos moderadores e administradores do servidor. O desenvolvedor do Bot não se responsabiliza por:

- Banimentos indevidos ou injustificados.
- Castigos aplicados de forma desproporcional.
- Avisos emitidos sem fundamento.
- Exclusão indevida de mensagens.

---

## 12. Modificações nos Termos

O desenvolvedor reserva-se o direito de modificar estes Termos a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após sua publicação. O uso continuado do Bot após a publicação de alterações constitui aceitação dos novos Termos.

Recomendamos que os administradores revisem periodicamente estes Termos para se manterem informados sobre eventuais alterações.

---

## 13. Suspensão e Encerramento

O desenvolvedor reserva-se o direito de:

- Suspender ou encerrar o acesso ao Bot a qualquer momento, por qualquer motivo, sem aviso prévio.
- Bloquear servidores ou usuários específicos que violem estes Termos ou as diretrizes do Discord.
- Descontinuar o Bot permanentemente, sem obrigação de manter o serviço em funcionamento.

---

## 14. Propriedade Intelectual

Todo o código-fonte, design, funcionalidades e conteúdo associados ao Auto Bot são de propriedade exclusiva do desenvolvedor. É proibida a reprodução, distribuição, modificação ou engenharia reversa do Bot sem autorização prévia e expressa.

---

## 15. Legislação Aplicável

Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Quaisquer disputas decorrentes destes Termos serão submetidas ao foro da comarca do domicílio do desenvolvedor, com exclusão de qualquer outro, por mais privilegiado que seja.

---

## 16. Contato

Para dúvidas, solicitações ou reclamações relacionadas a estes Termos de Serviço ou ao funcionamento do Bot, entre em contato através do servidor oficial de suporte no Discord.

---

## 17. Disposições Gerais

- Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.
- A falha do desenvolvedor em exercer ou fazer valer qualquer direito ou disposição destes Termos não constituirá renúncia a tal direito ou disposição.
- Estes Termos constituem o acordo integral entre o Usuário e o desenvolvedor em relação ao uso do Bot.

---

*Ao utilizar o Auto Bot, você confirma que leu, compreendeu e concorda com todos os termos e condições aqui descritos.*
