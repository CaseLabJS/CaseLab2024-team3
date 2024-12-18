import { DEFAULT_PAGE_SIZE } from '@constants/defaultConstants';
import { Table } from '@tanstack/react-table';

interface TableSelectCountRowProps<TData> {
  table: Table<TData>;
}

export const TableSelectCountRow = <TData,>({
  table,
}: TableSelectCountRowProps<TData>) => {
  return (
    <div className="flex gap-3 items-center">
      <span>Показать на странице</span>
      <select
        className="h-10 pl-2 rounded-md border bg-background border-indigo-700"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[DEFAULT_PAGE_SIZE, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};
