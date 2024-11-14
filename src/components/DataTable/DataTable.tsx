import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/UI';
import { DataTableProps } from '@components/DataTable/DataTable.types';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AdminDialogData } from 'src/types/adminTypes';

export function DataTable<TData extends AdminDialogData, TValue>({
  columns,
  data,
  relatedData,
  onDelete,
  onEdit,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      relatedData: relatedData ?? [],
      onDelete,
      onEdit,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const cellValue = cell.getValue();

                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {Array.isArray(cellValue)
                        ? cellValue.map((el) => {
                            return (
                              <Badge
                                key={crypto.randomUUID()}
                                variant="outline"
                                className="cursor-pointer m-1"
                              >
                                {relatedData
                                  ? (relatedData.find((data) => {
                                      if ('id' in data) return data.id === el;
                                    })?.name ?? '')
                                  : typeof el === 'object' && 'name' in el
                                    ? el.name
                                    : String(el)}
                              </Badge>
                            );
                          })
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
