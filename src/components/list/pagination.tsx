import {
  Pagination,
  PaginationContent,
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
}

export default function ListPagination({
  path,
  total,
  page = 1,
  limit = 6,
}: ListPaginationProps) {
  const isPersistNext = page * limit < total;
  const isPersistPrevious = page > 1;

  return (
    <Pagination className={"my-4"}>
      <PaginationContent>
        <PaginationItem>
          {isPersistPrevious ? (
            <PaginationPrevious
              href={{
                pathname: path,
                query: {
                  page: page - 1,
                },
              }}
              disabled={isPersistPrevious}
              aria-disabled={isPersistPrevious}
              isActive={isPersistPrevious}
            />
          ) : (
            <></>
          )}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`${path}`} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          {isPersistNext ? (
            <PaginationNext
              href={{
                pathname: path,
                query: {
                  page: page + 1,
                },
              }}
              disabled={isPersistNext}
              aria-disabled={isPersistNext}
              isActive={isPersistNext}
            />
          ) : (
            <></>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
