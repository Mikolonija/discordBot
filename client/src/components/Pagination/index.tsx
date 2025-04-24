import { useMemo } from 'react';
import { MAX_VISIBLE_PAGES_DEFAULT } from '@/config';
import { PaginationStyle } from '@/components/Pagination/style';

interface Props {
  total: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}
const Pagination = (props: Props) => {
  const { total, limit, offset, onPageChange } = props;

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const goToPage = (page: number) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
  };

  const generatePageNumbers = (startPage: number, endPage: number): number[] => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const calculatePageRange = (
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number,
  ): { startPage: number; endPage: number } => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    return { startPage, endPage };
  };

  const pageNumbers = useMemo(() => {
    if (totalPages == 0) return [];
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      MAX_VISIBLE_PAGES_DEFAULT,
    );
    return generatePageNumbers(startPage, endPage);
  }, [currentPage, totalPages]);

  return (
    <PaginationStyle>
      {pageNumbers.length !== 1 && totalPages >= 1 && (
        <>
          <button
            className="g-btn-submit g-font-bold14"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          <div className="pages">
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={
                  page === currentPage
                    ? 'g-btn-submit g-font-bold14 not-allow'
                    : 'g-btn-cancel g-font-bold14 '
                }
                onClick={() => page !== currentPage && goToPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="g-btn-submit g-font-bold14"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </>
      )}
    </PaginationStyle>
  );
};

export default Pagination;
