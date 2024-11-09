import { ColumnDef } from '@tanstack/react-table';
import { ChangeAttribute, CreateDocumentType } from 'src/types/index';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  relatedData?: ChangeAttribute[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, data: CreateDocumentType) => Promise<void>;
}
