import { DialogTexts } from 'src/types/docTypes';
import { ChangeDocumentType, CreateDocumentType } from 'src/types/index';

export interface OptionItem {
  value: string;
  label: string;
  isSelected: boolean | undefined;
}

export type DocumentType = ChangeDocumentType | CreateDocumentType;

export interface AdminDialogProps<TData, TRelatedData> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: {
    (data: TData): Promise<void>;
    (id: number, data: Partial<TData>): Promise<void>;
  };
  relatedData?: TRelatedData[];
}
