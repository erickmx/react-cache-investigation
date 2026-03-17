export interface DropdownItemProps {
  label: string;
  value: string;
  onClick: (value: string) => void;
  isActive?: boolean;
}

export function DropdownItem({ label, value, onClick, isActive = false }: DropdownItemProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-100 font-semibold' : ''
      }`}
    >
      {label}
    </button>
  );
}
