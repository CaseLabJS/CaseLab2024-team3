import { CreateDocument, DialogTexts } from 'src/types/index';

export interface OptionItem {
  value: string;
  label: string;
  isSelected: boolean | undefined;
}

export type DocumentType = CreateDocument;

export interface CreateDocumentProps<
  TData = CreateDocument,
  TType = any,
  TAttributes = any,
> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: {
    (data: TData): Promise<void>;
    (id: number, data: Partial<TData>): Promise<void>;
  };
  documentTypes?: TType[];
  documentAttributes?: TAttributes[];
  updateTableData?: () => void;
}
