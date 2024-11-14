import {
  ChangeDocumentType,
  CreateDocumentType,
  ChangeAttribute,
  CreateAttribute,
} from 'src/types/index';

export interface DialogTexts {
  dialogTitleText?: string;
  dialogDescriptionText?: string;
  btnTriggerText?: string;
}

export interface OptionItem {
  value: string;
  label: string;
  isSelected: boolean | undefined;
}

export type DocumentType = ChangeDocumentType | CreateDocumentType;
export type Attribute = ChangeAttribute | CreateAttribute;

export type AdminDialogData =
  | ChangeDocumentType
  | CreateDocumentType
  | ChangeAttribute
  | CreateAttribute;

export type CreateAdminDialogData = CreateDocumentType | CreateAttribute;
export type ChangeAdminDialogData = ChangeDocumentType | ChangeAttribute;

export interface AdminDialogProps<TData, TRelatedData> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: (data: Partial<TData>, id?: number) => Promise<void>;
  relatedData?: TRelatedData[];
}
