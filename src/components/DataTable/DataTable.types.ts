import { ActionItem, ActionMore } from '@components/Action/types';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { AdminDialogData, RecordStateInfo } from 'src/types/index';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  relatedData: { id: number; name: string }[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: Partial<AdminDialogData>, id?: number) => Promise<void>;
}
export interface CustomTableMeta<TData> {
  pagination?: {
    totalPages?: number;
  };
  actionItem?: (props: ActionItem<TData>) => unknown;
  actionMore?: ActionMore<TData>;
  state?: RecordStateInfo<string>;
  relatedData?: { id: number; name: string }[];
  onDelete?: (id: number) => Promise<void>;
  onEdit?: (data: Partial<AdminDialogData>, id?: number) => Promise<void>;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData> extends CustomTableMeta<TData> {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue>
    extends CustomTableMeta<TData> {}
}
