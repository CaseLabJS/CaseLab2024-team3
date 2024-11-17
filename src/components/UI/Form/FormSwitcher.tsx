import { FC } from 'react';
import { BaseForm } from '.';
import { FieldTypes, FormSwitcherProps } from './types';

const MapComponent: Record<FieldTypes, FC<FormSwitcherProps>> = {
  [FieldTypes.Input]: (props) => <BaseForm.FormFieldInput {...props} />,
};

export const FormSwitcher: FC<FormSwitcherProps> = (field) => {
  const { type } = field;
  const Component = MapComponent[type] ?? null;
  if (!Component) return null;
  return <Component {...field} />;
};
