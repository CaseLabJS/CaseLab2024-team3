import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@components/UI/Pagination/Pagination';
import { Table } from '@tanstack/react-table';
import React from 'react';

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export const TablePagination = <TData,>({
  table,
  ...props
}: TablePaginationProps<TData>) => {
  const margin = 1;
  const totalPages = table.options.meta?.pagination?.totalPages ?? 1;
  const numberOfPages = Math.ceil(totalPages / 1);
  const page = table.getState().pagination.pageIndex + 1;

  const shouldRender = (idx: number) =>
    idx == page ||
    Math.abs(idx - page) <= margin ||
    idx === numberOfPages - 1 ||
    idx === 0;

  const shouldRenderEllipsis = (idx: number) =>
    idx == page || Math.abs(idx - page) === margin + 1;

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {Array(numberOfPages)
          .fill(0)
          .map((_, i) => {
            return shouldRender(i) ? (
              <PaginationItem key={i}>
                <PaginationButton
                  isActive={page == i + 1 && true}
                  disabled={page == i + 1 && true}
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </PaginationButton>
              </PaginationItem>
            ) : shouldRenderEllipsis(i) ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <React.Fragment key={i}></React.Fragment>
            );
          })}
        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            disabled={page == totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
