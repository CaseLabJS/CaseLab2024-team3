import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/UI';
import { Table } from '@tanstack/react-table';
import { Settings } from 'lucide-react';

import { ReactNode } from 'react';

interface TableActiveColumnsProps<TData> {
  table: Table<TData>;
}

export const TableActiveColumns = <TData,>({
  table,
}: TableActiveColumnsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                disabled={!column.getCanHide()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                {column.columnDef.header as ReactNode}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
