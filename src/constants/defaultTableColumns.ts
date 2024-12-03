import { RecordStateInfo } from '@/types/state';
import { ActionMore } from '@components/Action';
import {
  DocTypesCell,
  TableActiveColumns,
  TableDateCell,
  TableStatusCell,
} from '@components/DataTable2/ui';
import { AttributeCell } from '@components/DataTable2/ui/TableAttributeCell';
import type { ColumnDef } from '@tanstack/react-table';

export const defaultColumn = <T>(props: ColumnDef<T>): ColumnDef<T> => {
  return {
    minSize: 55,
    maxSize: 800,
    enableSorting: false,
    ...props,
  };
};

export const idColumn = <T>(props?: ColumnDef<T>): ColumnDef<T> => {
  return defaultColumn({
    accessorKey: 'id',
    header: 'ID',
    size: 55,
    minSize: 55,
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

export const attributeColumn = <T>(props?: ColumnDef<T>): ColumnDef<T> => {
  const { meta, ..._props } = props as ColumnDef<T>;
  return defaultColumn<T>({
    cell: AttributeCell,
    minSize: 180,
    size: 150,
    meta: {
      ...meta,
    },
    ..._props,
  });
};

export const DocTypeColumn = <T>(props?: ColumnDef<T>): ColumnDef<T> => {
  const { meta, ..._props } = props as ColumnDef<T>;
  return defaultColumn<T>({
    cell: DocTypesCell,
    minSize: 180,
    size: 150,
    meta: {
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
