import { PaginationItem } from './PaginationItem';

export interface PaginationGroupProps {
  pages: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationGroup({ pages, currentPage, onPageChange }: PaginationGroupProps) {
  if (pages.length === 0) return null;

  return (
    <div className="flex gap-2">
      {pages.map((page) => (
        <PaginationItem
          key={page}
          pageNumber={page}
          isActive={page === currentPage}
          onClick={onPageChange}
        />
      ))}
    </div>
  );
}
