type SendButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function SendButton({ disabled, onClick }: SendButtonProps) {
  return (
    <button
      type="button"
      aria-label="Enviar mensagem"
      disabled={disabled}
      onClick={onClick}
      className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    >
      Enviar
    </button>
  );
}
