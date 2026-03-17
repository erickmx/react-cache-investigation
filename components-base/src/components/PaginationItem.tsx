export interface PaginationItemProps {
  pageNumber: number;
  isActive?: boolean;
  onClick: (page: number) => void;
}

export function PaginationItem({ pageNumber, isActive = false, onClick }: PaginationItemProps) {
  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={`w-10 h-10 rounded-full font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {pageNumber}
    </button>
  );
}
