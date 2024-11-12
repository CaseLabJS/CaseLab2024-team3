import { ColumnDef } from '@tanstack/react-table';
import { AdminDialogData } from 'src/types/index';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  relatedData: TData[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: Partial<AdminDialogData>, id?: number) => Promise<void>;
}

export interface CustomTableMeta<TData> {
  relatedData: TData[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: Partial<AdminDialogData>, id?: number) => Promise<void>;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData> extends CustomTableMeta<TData> {}
}
