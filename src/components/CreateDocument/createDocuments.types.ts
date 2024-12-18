import { CreateDocument, DialogTexts } from 'src/types/index';

export interface OptionItem {
  value: string;
  label: string;
}

export type DocumentType = CreateDocument;

export interface CreateDocumentProps<
  TData = CreateDocument,
  TType = unknown,
  TAttributes = unknown,
> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: {
    (data: TData): Promise<void>;
  };
  documentTypes?: TType[];
  documentAttributes?: TAttributes[];
  updateTableData?: () => void;
}
