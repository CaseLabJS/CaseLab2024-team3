import {
  TableBody as TableBodyComp,
  TableCell,
  TableRow,
} from '@components/UI';
import { flexRender, type Table } from '@tanstack/react-table';
import { getCommonPinningStyles } from '../utils';

interface TableBodyProps<TData> {
  table: Table<TData>;
}

export const TableBody = <TData,>({ table }: TableBodyProps<TData>) => {
  const actionItem = table.options.meta?.actionItem;
  const TableRowLink = actionItem ? 'a' : TableRow;
  return (
    <TableBodyComp className="border">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          if (!row) return null;
          const props = actionItem?.({ row }) ?? {};
          return (
            <TableRowLink
              key={row.id}
              className="relative table-row border last:border-none after:content-[''] after:absolute after:inset-0 after:inset-y-[-1px] after:hover:bg-foreground/5 after:pointer-events-none after:z-[1] dark:after:hover:bg-muted/20"
              {...props}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  {...getCommonPinningStyles(cell.column)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRowLink>
          );
        })
      ) : (
        <TableRow>
          <TableCell
            //Проверить совпадает ли с columns.length
            colSpan={table._getColumnDefs().length}
            className="h-24 text-center"
          >
            Результатов нет.
          </TableCell>
        </TableRow>
      )}
    </TableBodyComp>
  );
};
