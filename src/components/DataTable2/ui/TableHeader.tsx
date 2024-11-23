import {
  TableHead,
  TableHeader as TableHeaderComp,
  TableRow,
} from '@components/UI';
import { flexRender, type Table } from '@tanstack/react-table';
import { getCommonPinningStyles } from '../utils';
import { TableResize } from './TableResize';
import { cn } from '@/lib';
import { TableSorting } from './TableSorting';
interface TableHeaderProps<TData> {
  table: Table<TData>;
}

export const TableHeader = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
    <TableHeaderComp className="sticky bg-background top-[-1px] z-[2]">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className="relative border-none after:content-[''] after:absolute after:inset-0 after:top-[1px] after:pointer-events-none after:z-[1] after:border after:border-border"
        >
          {headerGroup.headers.map((header) => {
            const { style, className } = getCommonPinningStyles(header.column);
            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                style={style}
                className={cn(className)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                <TableSorting header={header} />
                <TableResize header={header} />
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeaderComp>
  );
};
