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
    <TableHeaderComp className="sticky bg-muted top-[-1px] z-[2]">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
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
