# PRD — Chat Offline

> Baseado em `.docs/brain-dump.md`. Decisões de UX validadas com o produto (ver seção "Decisões tomadas").

---

## 1. Visão geral

**Produto:** Janela única de chat offline (sem persistência).
**Objetivo:** O usuário digita uma mensagem e escolhe, via toggle, se ela será assinada como **usuário** ou **robô**. As mensagens do usuário aparecem à direita do histórico; as do robô, à esquerda. Não há backend nem persistência — o histórico vive apenas em estado (`state`) da aplicação.

**Stack (já configurada):** Vite + React 19 + TypeScript + Tailwind CSS v4 + Oxlint.

---

## 2. Decisões tomadas (escopo fechado)

| Item | Decisão |
|------|---------|
| Posicionamento do card de input | `position: fixed`, a `2rem` da base da viewport, centralizado horizontalmente, sempre visível sobre o histórico |
| Toggle usuário/robô | Segmented button (dois botões lado a lado: "Usuário" \| "Robô"). Modo usuário: fundo cinza claro no card; modo robô: fundo branco e borda roxa |
| Envio por teclado | `Enter` envia; `Shift + Enter` quebra linha (textarea de altura automática) |
| Auto-scroll | Ao adicionar nova mensagem, o histórico rola automaticamente para o bottom |
| Atribuição do robô | O usuário digita o texto e escolhe via toggle se assina como usuário ou robô (mesmo input) |
| Timestamps | Sim, cada mensagem exibe hora de envio |
| Estado vazio | Sim, exibe "Nenhuma mensagem ainda" quando o histórico estiver vazio |
| Persistência | Não (apenas state em memória) |

---

## 3. Requisitos funcionais

### RF01 — Envio de mensagem
- O usuário digita texto no input.
- Ao clicar em "Enviar" ou pressionar `Enter`, a mensagem é adicionada ao histórico com a atribuição selecionada no toggle (usuário ou robô).
- Após o envio, o input é limpo e retorna à altura inicial.

### RF02 — Toggle de atribuição
- Segmented button com duas opções: **Usuário** (padrão) e **Robô**.
- Quando "Robô" está ativo, o card do input recebe uma **borda roxa**, indicando visualmente que a próxima mensagem será assinada como robô.

### RF03 — Botão de enviar
- Fica à direita dentro do card de input.
- Está **desabilitado** quando não há texto digitado.
- Fica habilitado assim que houver pelo menos um caractere não-vazio.

### RF04 — Histórico de mensagens
- Armazenado em state (React), sem persistência (sem localStorage).
- Mensagens do **usuário** alinham à **direita**.
- Mensagens do **robô** alinham à **esquerda**.
- Cada mensagem exibe: texto e timestamp (hora).

### RF05 — Estado vazio
- Quando não há mensagens, exibe o texto "Nenhuma mensagem ainda" (ou similar) no centro do histórico.

### RF06 — Auto-scroll
- Sempre que uma nova mensagem é adicionada, o histórico rola automaticamente para a última mensagem.

---

## 4. Especificação visual

| Elemento | Especificação |
|----------|---------------|
| Fundo da tela | Marrom claro (`bg-brown-50` ou similar) |
| Container do chat | Largura máxima `2xl`, centralizado horizontalmente |
| Card do input | Usuário: fundo cinza claro; Robô: fundo branco. Altura automática até `8rem`, com scroll quando o texto excede |
| Posicionamento do input | Fixo a `2rem` da base da viewport, centralizado horizontalmente, largura máxima `2xl` (sempre visível) |
| Alinhamento das mensagens | Usuário = direita; Robô = esquerda |
| Borda do input (modo robô) | Roxa, quando o toggle "Robô" está ativo |
| Botão enviar | Desabilitado (cinza) quando vazio; habilitado (cor primária) quando há texto |

---

## 5. Requisitos técnicos / não-funcionais

- **TypeScript strict** habilitado.
- **Types** salvos em `src/types/`, utilizando `type` (não `interface`).
- **Components** salvos em `src/components/`.
- Nenhuma dependência de biblioteca de UI externa (componentes feitos com Tailwind + React puro).
- Acessibilidade básica: botões com `type="button"`, input com `aria-label`, foco visível.
- Build e lint passam: `npm run build` e `npm run lint` sem erros.

---

## 6. Estrutura de pastas proposta

```
src/
  main.tsx
  index.css          (@import "tailwindcss")
  App.tsx            (componente raiz)
  types/
    message.ts       (type Message, type Sender, type ChatState)
  components/
    Chat.tsx
    MessageList.tsx
    MessageBubble.tsx
    EmptyState.tsx
    InputCard.tsx
    SenderToggle.tsx
    SendButton.tsx
```

---

## 7. Modelos de dados

`src/types/message.ts`

```ts
export type Sender = "user" | "robot";

export type Message = {
  id: string;
  text: string;
  sender: Sender;
  createdAt: string; // ISO string ou timestamp
};

export type ChatState = {
  messages: Message[];
};
```

---

## 8. Tarefas de implementação — ordem progressiva

As tarefas estão ordenadas de forma que cada etapa gere algo testável na tela antes de passar para a próxima.

### Fase 1 — Estrutura e tipos (fundação)
- [x] **T1.1** Criar `src/types/message.ts` com `Sender`, `Message` e `ChatState`.
- [x] **T1.2** Limpar `src/App.tsx` e montar esqueleto do `App` com container centralizado (`max-w-2xl`, `mx-auto`) e fundo marrom claro da tela.
- [x] **T1.3** Criar componente `MessageBubble` recebe `Message` e renderiza texto + timestamp, alinhando conforme `sender` (usuário direita / robô esquerda).

### Fase 2 — Histórico e estado vazio
- [x] **T2.1** Criar `MessageList` que recebe a lista de mensagens, renderiza `MessageBubble` para cada uma e faz auto-scroll para o bottom quando a lista muda.
- [x] **T2.2** Criar `EmptyState` exibindo "Nenhuma mensagem ainda" quando a lista estiver vazia.
- [x] **T2.3** Integrar `MessageList` + `EmptyState` no `App` com estado inicial (ex: 1–2 mensagens fixas para testar alinhamento e scroll).

### Fase 3 — Card de input e toggle
- [x] **T3.1** Criar `SenderToggle` (segmented button "Usuário" \| "Robô") que expõe o sender selecionado.
- [x] **T3.2** Criar `InputCard` (fundo branco, fixo na base e centralizado horizontalmente) contendo:
  - textarea de altura automática (`Enter` envia, `Shift+Enter` quebra linha),
  - `SenderToggle` à esquerda,
  - `SendButton` à direita.
- [x] **T3.3** Quando toggle = "Robô", aplicar borda roxa no `InputCard`.
- [x] **T3.4** Criar `SendButton` desabilitado quando não houver texto digitado.

### Fase 4 — Lógica de envio e integração
- [x] **T4.1** No `App`, implementar state `messages: Message[]` e função `addMessage(text, sender)` que gera `id`, `createdAt` e insere no topo/base da lista.
- [x] **T4.2** Conectar `InputCard` ao `App`: ao enviar, chama `addMessage` com o sender do toggle, limpa o input e reseta a altura.
- [x] **T4.3** Garantir auto-scroll após cada envio.

### Fase 5 — Refinamento, acessibilidade e quality gates
- [x] **T5.1** Ajustar responsividade (container 2xl, input fixo não cobrir mensagens em telas pequenas — considerar `pb` no container ou comportamento em mobile).
- [x] **T5.2** Adicionar `aria-label` e foco visível nos botões/input.
- [x] **T5.3** Rodar `npm run lint` (oxlint) e corrigir avisos/erros.
- [x] **T5.4** Rodar `npm run build` (tsc + vite build) e garantir build limpo.
- [x] **T5.5** Revisão visual final contra o brain-dump (fundo marrom, input branco, borda roxa no robô, mensagens alinhadas corretamente).

---

## 9. Critérios de aceitação (Definition of Done)

- [ ] O chat abre e exibe fundo marrom claro com container centralizado (máx. 2xl).
- [ ] Digitar texto habilita o botão "Enviar"; campo vazio mantém botão desabilitado.
- [ ] Enviar como **usuário** adiciona bolha à **direita**; enviar como **robô** adiciona bolha à **esquerda**.
- [ ] Toggle "Robô" ativo deixa o card de input com **borda roxa**.
- [ ] Cada mensagem exibe **texto e timestamp**.
- [ ] Histórico vazio exibe mensagem de estado vazio ("Nenhuma mensagem ainda").
- [ ] Nova mensagem faz **auto-scroll para o bottom**.
- [ ] `Enter` envia; `Shift + Enter` quebra linha no textarea de altura automática.
- [ ] Não há persistência (ao recarregar a página, o histórico some).
- [ ] `npm run build` e `npm run lint` concluem sem erros.

---

## 10. Fora do escopo (MVP)

- Persistência (localStorage / IndexedDB / backend).
- Autenticação de usuários.
- Edição ou exclusão de mensagens.
- Upload de arquivos / imagens.
- Indicação de "digitando...".
- Notificações sonoras.
- Várias salas de chat.

---

## 11. Riscos e pontos de atenção

1. **Input `fixed` sobrepondo mensagens em telas pequenas:** se o histórico for longo, o input fixo pode cobrir a última mensagem. Mitigar com `padding-bottom` no container ou comportamento diferente em mobile se necessário.
2. **Altura automática do textarea:** garantir que não haja salto de layout ao digitar e que o `Enter` não adicione nova linha indesejada.
3. **Auto-scroll:** deve disparar apenas quando nova mensagem é adicionada, não a cada digitação no input.
