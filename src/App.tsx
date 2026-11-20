import { useState } from "react";
import { EmptyState } from "./components/EmptyState";
import { InputCard } from "./components/InputCard";
import { MessageList } from "./components/MessageList";
import type { Message, Sender } from "./types/message";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(text: string, sender: Sender) {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, newMessage]);
  }

  return (
    <div className="min-h-screen bg-brown-50">
      <main className="mx-auto max-w-2xl px-4 pt-8 pb-40 sm:pb-28">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
      </main>

      <InputCard onSend={addMessage} />
    </div>
  );
}
