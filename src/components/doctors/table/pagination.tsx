import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function DoctorPagination({
  page,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (lastPage <= 3) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 2) {
        pages.push(-1);
      }

      if (page !== 1 && page !== lastPage) {
        pages.push(page);
      }

      if (page < lastPage - 1) {
        pages.push(-1);
      }

      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {getPageNumbers().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === -1 ? (
              <PaginationLink className="cursor-not-allowed">
                ...
              </PaginationLink>
            ) : (
              <PaginationLink
                href="#"
                onClick={() => onPageChange(pageNum)}
                isActive={page === pageNum}>
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page < lastPage && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
