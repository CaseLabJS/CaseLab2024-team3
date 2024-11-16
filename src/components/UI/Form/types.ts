export enum FieldTypes {
  Input = 'Input',
}

export type BaseFieldProps = {
  name: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};
