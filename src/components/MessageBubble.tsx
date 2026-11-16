import type { Message } from "../types/message";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`mb-4 ${isUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block max-w-[80%] px-4 py-2 rounded-xl ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-white text-gray-900 border border-gray-200 rounded-tl-none"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span className="text-xs opacity-60 block mt-1">
          {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
