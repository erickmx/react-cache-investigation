import { ReactNode } from 'react';

export interface CardGridProps {
  children: ReactNode;
  columns?: number;
}

export function CardGrid({ children, columns = 4 }: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols] || 'grid-cols-4'} gap-6 p-4`}>
      {children}
    </div>
  );
}
