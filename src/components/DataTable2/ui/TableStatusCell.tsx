import { cn } from '@/lib/utils';
import { Badge } from '@components/UI';
import { CellContext } from '@tanstack/react-table';

export const TableStatusCell = <T, Value>(
  cellContext: CellContext<T, Value>
) => {
  const state =
    cellContext.table.options.meta?.state ??
    cellContext.column.columnDef.meta?.state ??
    {};
  const value = cellContext.getValue() as string;
  const render = state[value] ?? value;
  return (
    <Badge
      variant="outline"
      className={cn(render?.className ? render.className : undefined)}
    >
      {render.title}
    </Badge>
  );
};
