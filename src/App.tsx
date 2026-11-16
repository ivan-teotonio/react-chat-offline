import { useState } from "react";
import { MessageBubble } from "./components/MessageBubble";
import type { Message } from "./types/message";

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Olá! Como posso ajudar você hoje?",
    sender: "robot",
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [messages] = useState<Message[]>(initialMessages);

  return (
    <div className="min-h-screen bg-brown-50">
      <main className="max-w-2xl mx-auto py-8 px-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </main>
    </div>
  );
}
