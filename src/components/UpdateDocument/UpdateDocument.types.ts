import {
  ChangeDocument,
  CreateDocument,
  DialogTexts,
  Attribute,
} from 'src/types/index';

export type DocumentType = ChangeDocument;

export interface UpdateDocumentProps<
  TData = CreateDocument,
  TType = any,
  TAttributes = Attribute[],
> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: {
    (data: TData): Promise<void>;
    (id: number, data: Partial<TData>): Promise<void>;
  };
  documentTypes?: TType[];
  documentAttributes: TAttributes;
  onSetInputs: {
    (id: number): Promise<void>;
  };
}