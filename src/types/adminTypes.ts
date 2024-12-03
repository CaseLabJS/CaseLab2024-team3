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

export type AdminDialogData =
  | ChangeDocumentType
  | CreateDocumentType
  | ChangeAttribute
  | CreateAttribute
  | UserRegister
  | ChangeUser;
