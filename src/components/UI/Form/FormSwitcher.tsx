import { Input } from '@components/UI/Input';
import { FC } from 'react';
import Select from 'react-select';
import { BaseForm } from '.';
import { FieldTypes, FormSwitcherProps } from './types';

const MapComponent: Record<FieldTypes, FC<FormSwitcherProps>> = {
  [FieldTypes.Input]: ({ baseFieldProps }) => (
    <BaseForm.FormFieldInput {...baseFieldProps} />
  ),
  [FieldTypes.Select]: ({ baseFieldProps, selectFieldProps }) => {
    return (
      <label className="text-indigo-700 text-sm font-medium mt-4">
        {baseFieldProps.label}
        <Select
          {...selectFieldProps}
          className="text-base font-normal text-foreground mt-3 basic-multi-select"
        />
      </label>
    );
  },
  [FieldTypes.Checkbox]: ({ baseFieldProps, checkboxFieldProps }) => {
    return (
      <label className="text-indigo-700 text-sm font-medium mt-4 flex ">
        {baseFieldProps.label}
        <Input
          className="ml-2"
          {...{ ...baseFieldProps, ...checkboxFieldProps }}
        />
      </label>
    );
  },
};

export const FormSwitcher: FC<FormSwitcherProps> = (field) => {
  const { type } = field.baseFieldProps;
  const Component = MapComponent[type] ?? null;
  if (!Component) return null;
  return <Component {...field} />;
};
