import type { Table } from '@tanstack/react-table';
import { TablePagination } from './TablePagination';
import { TableSelectCountRow } from './TableSelectCountRow';

interface TableFooterProps<TData> {
  table: Table<TData>;
}

export const TableFooter = <TData,>({ table }: TableFooterProps<TData>) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <TableSelectCountRow table={table} />
      <TablePagination table={table} />
    </div>
  );
};
