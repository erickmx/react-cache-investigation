'use client';

import { useMemo } from 'react';
import { PaginationGroup } from './PaginationGroup';

export interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationFooter({ currentPage, totalPages, onPageChange }: PaginationFooterProps) {
  const paginationGroups = useMemo(() => {
    const groups: number[][] = [];
    const maxGroups = 3;
    const groupSize = 3;

    if (totalPages <= maxGroups * groupSize) {
      const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
      for (let i = 0; i < allPages.length; i += groupSize) {
        groups.push(allPages.slice(i, i + groupSize));
      }
    } else {
      groups.push([1, 2, 3]);
      
      if (currentPage > 4 && currentPage < totalPages - 3) {
        groups.push([currentPage - 1, currentPage, currentPage + 1]);
      } else if (currentPage <= 4) {
        groups.push([4, 5, 6]);
      }
      
      groups.push([totalPages - 2, totalPages - 1, totalPages]);
    }

    return groups;
  }, [currentPage, totalPages]);

  const getVisibleGroups = () => {
    if (totalPages <= 9) return paginationGroups;

    const firstGroup = paginationGroups[0];
    const lastGroup = paginationGroups[paginationGroups.length - 1];
    const middleGroups = paginationGroups.slice(1, -1);

    const currentGroupIndex = middleGroups.findIndex(
      group => group.includes(currentPage)
    );

    if (currentGroupIndex === -1) {
      if (currentPage <= 3) {
        return [firstGroup, middleGroups[0], lastGroup];
      } else {
        return [firstGroup, middleGroups[middleGroups.length - 1], lastGroup];
      }
    }

    return [firstGroup, middleGroups[currentGroupIndex], lastGroup];
  };

  const visibleGroups = getVisibleGroups();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        style={{ backgroundColor: '#374151', color: '#e8e6e3' }}
        className="px-3 py-2 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>

      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={{ backgroundColor: '#374151', color: '#e8e6e3' }}
        className="px-3 py-2 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <div className="flex items-center gap-2">
        {visibleGroups[0] && (
          <>
            <PaginationGroup
              pages={visibleGroups[0]}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            {visibleGroups[0][visibleGroups[0].length - 1] < (visibleGroups[1]?.[0] || totalPages) - 1 && (
              <span className="px-2">...</span>
            )}
          </>
        )}

        {visibleGroups[1] && visibleGroups[1][0] > (visibleGroups[0]?.[visibleGroups[0]?.length - 1] || 0) + 1 && (
          <>
            <PaginationGroup
              pages={visibleGroups[1]}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
            {visibleGroups[1][visibleGroups[1].length - 1] < (visibleGroups[2]?.[0] || totalPages + 1) - 1 && (
              <span className="px-2">...</span>
            )}
          </>
        )}

        {visibleGroups[2] && (
          <PaginationGroup
            pages={visibleGroups[2]}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{ backgroundColor: '#374151', color: '#e8e6e3' }}
        className="px-3 py-2 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{ backgroundColor: '#374151', color: '#e8e6e3' }}
        className="px-3 py-2 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
  );
}
