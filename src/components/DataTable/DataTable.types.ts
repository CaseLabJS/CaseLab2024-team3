import { ActionItem, ActionMore } from '@components/Action/types';
import { RowData } from '@tanstack/react-table';
import { AdminDialogData, RecordStateInfo } from 'src/types/index';

export interface CustomTableMeta<TData> {
  pagination?: {
    totalPages?: number;
  };
  actionItem?: (props: ActionItem<TData>) => unknown;
  actionMore?: ActionMore<TData>;
  isOptionsMore?: (props: ActionItem<TData>) => boolean;
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
