# Chat Offline

Chat de janela única onde a mesma mensagem pode ser enviada como **Usuário** ou como **Robô**, escolhida por um toggle no card de input. Mensagens de usuário aparecem à direita e mensagens de robô à esquerda.

Não há backend nem persistência: o histórico vive apenas no estado do React e some ao recarregar a página.

## Stack

- Vite
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- Oxlint

## Funcionalidades

- Toggle segmentado **Usuário / Robô**: no modo usuário o card tem fundo cinza claro, e no modo robô fica branco com borda roxa.
- Textarea de altura automática: `Enter` envia e `Shift + Enter` quebra linha.
- Botão **Enviar** desabilitado enquanto não há texto não-vazio.
- Histórico com timestamp por mensagem, alinhamento por remetente e auto-scroll a cada envio.
- Estado vazio com a mensagem "Nenhuma mensagem ainda".
- Layout responsivo: container centralizado (`max-w-2xl`) e card fixo na parte inferior, alinhado ao centro horizontal da tela.

## Requisitos

- Node.js (versão LTS recomendada) e npm.

## Como executar

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal (por padrão, `http://localhost:5173`).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload. |
| `npm run build` | Roda `tsc -b` e gera o build de produção em `dist/`. |
| `npm run lint` | Roda o Oxlint no projeto. |
| `npm run preview` | Serve localmente o build gerado em `dist/`. |

## Estrutura

```
src/
  main.tsx                 ponto de entrada
  index.css                import do Tailwind + tema (cor brown-50)
  App.tsx                  componente raiz: estado das mensagens e addMessage
  types/
    message.ts             tipos Sender, Message e ChatState
  components/
    MessageList.tsx        histórico com auto-scroll
    MessageBubble.tsx      bolha individual com texto e timestamp
    EmptyState.tsx         estado vazio
    InputCard.tsx          card fixo: textarea, toggle e botão de enviar
    SenderToggle.tsx       segmented button Usuário / Robô
    SendButton.tsx         botão de envio
.docs/
  prd.md                   requisitos e tarefas (todas concluídas)
  brain-dump.md            ideias originais do produto
```

`src/App.css` é um arquivo legado do template inicial e não é importado.

## Documentação

- [PRD](.docs/prd.md) — escopo, decisões de UX e checklist de implementação.
- [Brain dump](.docs/brain-dump.md) — visão original do produto.
