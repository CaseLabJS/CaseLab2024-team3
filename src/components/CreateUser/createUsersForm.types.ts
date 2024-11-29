import { ChangeUser, DialogTexts, UserRegister } from 'src/types/index';

export interface OptionItem {
  value: string;
  label: string;
  isSelected: boolean | undefined;
}

export type CreateUser = UserRegister | ChangeUser;

export interface CreateUserProps<TData = CreateUser> {
  dialogTexts: DialogTexts;
  data: TData;
  onSave?: {
    (data: TData): Promise<void>;
  };
  onUpdate?: (id: string, data: Partial<TData>) => Promise<void>;
  updateTableData?: () => void;
}