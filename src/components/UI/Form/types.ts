import { Props as SelectProps } from 'react-select';

export enum FieldTypes {
  Input = 'Input',
  Select = 'Select',
  Checkbox = 'checkbox',
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

export type BaseFieldProps = {
  type: FieldTypes;
  name: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};

export type FormSwitcherProps = {
  baseFieldProps: BaseFieldProps & {
    type: FieldTypes;
  };
  selectFieldProps?: SelectProps;
  checkboxFieldProps?: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
  };
};

export interface OptionItem {
  value: string;
  label: string;
}
