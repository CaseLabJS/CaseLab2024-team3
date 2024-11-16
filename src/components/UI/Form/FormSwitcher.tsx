import { FC } from 'react';
import { BaseForm } from '.';
import { BaseFieldProps, FieldTypes } from './types';

const MapComponent: Record<
  FieldTypes,
  FC<BaseFieldProps & { type: FieldTypes }>
> = {
  [FieldTypes.Input]: (props) => <BaseForm.FormFieldInput {...props} />,
};

export const FormSwitcher: FC<BaseFieldProps & { type: FieldTypes }> = (
  field
) => {
  const { type } = field;
  const Component = MapComponent[type] ?? null;
  if (!Component) return null;
  return <Component {...field} />;
};
