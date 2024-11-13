import {
  ChangeDocumentType,
  CreateDocumentType,
  ChangeAttribute,
  CreateAttribute,
  UserRegister,
  ChangeUser,
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
export type User = UserRegister | ChangeUser;

export type AdminDialogData =
  | ChangeDocumentType
  | CreateDocumentType
  | ChangeAttribute
  | CreateAttribute
  | UserRegister
  | ChangeUser;

export type CreateAdminDialogData =
  | CreateDocumentType
  | CreateAttribute
  | UserRegister;
export type ChangeAdminDialogData =
  | ChangeDocumentType
  | ChangeAttribute
  | ChangeUser;

export interface AdminDialogProps<TData, TRelatedData> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: (data: Partial<TData>, id?: number | string) => Promise<void>;
  relatedData?: TRelatedData[];
}
