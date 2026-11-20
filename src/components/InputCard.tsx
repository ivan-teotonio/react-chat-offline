import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Sender } from "../types/message";
import { SendButton } from "./SendButton";
import { SenderToggle } from "./SenderToggle";

type InputCardProps = {
  onSend: (text: string, sender: Sender) => void;
};

export function InputCard({ onSend }: InputCardProps) {
  const [text, setText] = useState("");
  const [sender, setSender] = useState<Sender>("user");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajusta a altura ao digitar e também após limpar o campo no envio.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [text]);

  const canSend = text.trim().length > 0;

  function handleSend() {
    if (!canSend) return;

    onSend(text.trim(), sender);
    setText("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key.toLowerCase() === "enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-10 flex w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 flex-col gap-2 rounded-2xl border-2 p-3 shadow-lg sm:flex-row sm:items-end ${
        sender === "robot"
          ? "border-purple-500 bg-white"
          : "border-transparent bg-gray-50"
      }`}
    >
      <SenderToggle sender={sender} onChange={setSender} />

      <div className="flex min-w-0 flex-1 items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          aria-label="Mensagem"
          placeholder="Digite uma mensagem..."
          className="max-h-32 min-h-10 min-w-0 flex-1 resize-none overflow-y-auto rounded-md bg-transparent px-2 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />

        <SendButton disabled={!canSend} onClick={handleSend} />
      </div>
    </div>
  );
}
