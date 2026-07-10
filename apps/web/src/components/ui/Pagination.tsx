import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  if (totalItems === 0) return null;

  return (
    <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
      <span className="text-sm text-on-surface-variant">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
      </span>
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded bg-surface border border-outline-variant text-on-surface-variant hover:text-on-surface disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        
        <button className="px-3 py-1 rounded bg-[rgba(245,197,24,0.1)] text-primary border border-primary font-medium text-sm">
          {currentPage}
        </button>
        
        {currentPage < totalPages && (
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 rounded bg-surface border border-outline-variant text-on-surface hover:bg-surface-container font-medium text-sm"
          >
            {currentPage + 1}
          </button>
        )}
        
        {currentPage < totalPages - 1 && (
          <span className="px-2 text-on-surface-variant">...</span>
        )}
        
        <button 
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded bg-surface border border-outline-variant text-on-surface-variant hover:text-on-surface disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
