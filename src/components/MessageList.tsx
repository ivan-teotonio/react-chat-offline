import { useEffect, useRef } from "react";
import type { Message } from "../types/message";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }: { messages: Message[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  // Rola o histórico para a última mensagem sempre que a lista muda.
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={listRef}
      aria-label="Histórico de mensagens"
      aria-live="polite"
      className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
