import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ListPaginationProps {
  path: string;
  total: number;
  page?: number;
  limit?: number;
  query?: Record<string, string | number | undefined>;
}

export default function ListPagination({
  path,
  total,
  page = 1,
  limit = 6,
  query,
}: ListPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const hasNext = currentPage < totalPages;
  const hasPrevious = currentPage > 1;
  const pageWindowStart = Math.max(1, currentPage - 2);
  const pageWindowEnd = Math.min(totalPages, currentPage + 2);
  const pages = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, index) => pageWindowStart + index,
  );
  const getQuery = (targetPage: number) => ({
    ...query,
    page: targetPage,
  });
  const getHref = (targetPage: number) => ({
    pathname: path,
    query: getQuery(targetPage),
  });

  return (
    <Pagination className={"mt-auto mb-4 flex-col items-center gap-2"}>
      <p className="mt-8 text-muted-foreground text-sm">
        Page {currentPage} of {totalPages}
      </p>
      <PaginationContent>
        <PaginationItem>
          {hasPrevious ? (
            <PaginationPrevious
              href={getHref(currentPage - 1)}
              aria-label={`Go to page ${currentPage - 1}`}
            />
          ) : (
            <></>
          )}
        </PaginationItem>
        {pageWindowStart > 1 ? (
          <>
            <PaginationItem>
              <PaginationLink href={getHref(1)}>1</PaginationLink>
            </PaginationItem>
            {pageWindowStart > 2 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
          </>
        ) : null}
        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={getHref(pageNumber)}
              isActive={pageNumber === currentPage}
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageWindowEnd < totalPages ? (
          <>
            {pageWindowEnd < totalPages - 1 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink
                href={getHref(totalPages)}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}
        <PaginationItem>
          {hasNext ? (
            <PaginationNext
              href={getHref(currentPage + 1)}
              aria-label={`Go to page ${currentPage + 1}`}
            />
          ) : (
            <></>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
