export interface PaginationItemProps {
  pageNumber: number;
  isActive?: boolean;
  onClick: (page: number) => void;
}

export function PaginationItem({ pageNumber, isActive = false, onClick }: PaginationItemProps) {
  return (
    <button
      onClick={() => onClick(pageNumber)}
      style={{ 
        backgroundColor: isActive ? '#39ff14' : '#374151',
        color: isActive ? '#0a0e17' : '#e8e6e3'
      }}
      className="w-10 h-10 rounded-full font-medium transition-colors hover:opacity-80"
    >
      {pageNumber}
    </button>
  );
}
