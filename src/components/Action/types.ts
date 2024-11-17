import { ButtonProps } from '@components/UI';
import { Row } from '@tanstack/react-table';

export interface ActionDefaultData<TData> {
  data?: TData;
}

export type ActionMore<TData> = Record<
  string,
  React.FC<ActionDefaultData<TData> & Partial<ButtonProps>>
>;

export type ActionItem<TData> = { row?: Row<TData> };
