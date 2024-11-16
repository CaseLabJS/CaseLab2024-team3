import { ActionMore } from '@components/Action';
import {
  TableActiveColumns,
  TableDateCell,
  TableStatusCell,
} from '@components/DataTable2/ui';
import type { ColumnDef } from '@tanstack/react-table';
import { RecordStateInfo } from '@/types/state';

export const defaultColumn = <T>(props: ColumnDef<T>): ColumnDef<T> => {
  return {
    minSize: 200,
    maxSize: 700,
    enableSorting: false,
    ...props,
  };
};

export const idColumn = <T>(props?: ColumnDef<T>): ColumnDef<T> => {
  return defaultColumn({
    accessorKey: 'id',
    header: 'ID',
    size: 50,
    minSize: 50,
    maxSize: 100,
    enableSorting: true,
    ...props,
  });
};

type StateColumnProps<T> = ColumnDef<T> & {
  /**
   * Перечислить статусы для "stateColumn"
   */
  state: RecordStateInfo<string>;
};

export const stateColumn = <T>(props?: StateColumnProps<T>): ColumnDef<T> => {
  const { state = {}, meta, ..._props } = props as StateColumnProps<T>;
  return defaultColumn<T>({
    cell: TableStatusCell,
    minSize: 180,
    size: 150,
    meta: {
      state,
      ...meta,
    },
    ..._props,
  });
};

export const timeColumn = <T>(props: ColumnDef<T>): ColumnDef<T> => {
  return defaultColumn({ cell: TableDateCell, minSize: 250, ...props });
};

export const actionMoreColumn = <T>(props?: ColumnDef<T>): ColumnDef<T> => {
  return {
    accessorKey: 'actionMore',
    header: TableActiveColumns,
    size: 20,
    minSize: 20,
    maxSize: 20,
    cell: ActionMore,
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    enablePinning: true,
    ...props,
  };
};
