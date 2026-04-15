import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  const showSet = new Set<number>();

  // Always show first and last
  showSet.add(1);
  showSet.add(total);

  // Current page and neighbors
  showSet.add(current);
  if (current > 1) showSet.add(current - 1);
  if (current < total) showSet.add(current + 1);

  const sorted = Array.from(showSet).sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      pages.push("ellipsis");
    }
    pages.push(sorted[i]);
  }

  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination__btn pagination__btn--nav"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        Prev
      </button>

      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis">...</span>
        ) : (
          <button
            key={page}
            className={`pagination__btn pagination__btn--page${page === currentPage ? " pagination__btn--active" : ""}`}
            onClick={() => onPageChange(page)}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination__btn pagination__btn--nav"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        Next
      </button>
    </nav>
  );
}
