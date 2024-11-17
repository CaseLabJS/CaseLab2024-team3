import { isEmpty } from '@/lib';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/UI';
import { CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export const ActionMore = <T, Value>(cellContext: CellContext<T, Value>) => {
  const actionMore = cellContext.table.options.meta?.actionMore;
  if (isEmpty(actionMore)) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Открыть меню</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-48" align="end">
        {Object.entries(actionMore ?? {}).map(([keyAction, Component]) => {
          if (!Component) return null;
          return (
            <Component
              className="w-full"
              key={keyAction}
              data={cellContext.row.original}
            />
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
