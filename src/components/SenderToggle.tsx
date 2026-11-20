import type { Sender } from "../types/message";

type SenderToggleProps = {
  sender: Sender;
  onChange: (sender: Sender) => void;
};

const options: { value: Sender; label: string }[] = [
  { value: "user", label: "Usuário" },
  { value: "robot", label: "Robô" },
];

export function SenderToggle({ sender, onChange }: SenderToggleProps) {
  return (
    <div
      className="flex w-fit shrink-0 rounded-lg bg-gray-100 p-1"
      role="group"
      aria-label="Assinatura da mensagem"
    >
      {options.map((option) => {
        const isActive = sender === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`Assinar como ${option.label.toLowerCase()}`}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${
              isActive
                ? "bg-white font-medium text-purple-700 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
