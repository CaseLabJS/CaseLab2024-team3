import { Header } from '@tanstack/react-table';

interface TableSortingProps<TData> {
  header: Header<TData, unknown>;
}

export const TableSorting = <TData,>({ header }: TableSortingProps<TData>) => {
  return (
    <span
      onClick={header.column.getToggleSortingHandler()}
      className={
        header.column.getCanSort() ? 'cursor-pointer select-none' : 'hidden'
      }
    >
      {{
        asc: ' 🔼',
        desc: ' 🔽',
        false: ' 🔃',
      }[header.column.getIsSorted() as string] ?? null}
    </span>
  );
};
