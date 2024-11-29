export enum FieldTypes {
  Input = 'Input',
  Select = 'Select',
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

export type FormSwitcherProps = BaseFieldProps & { type: FieldTypes };
