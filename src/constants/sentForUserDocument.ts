import { ColumnDef } from '@tanstack/react-table';
import { GetDocument } from '@/types';
import {
  actionMoreColumn,
  defaultColumn,
  idColumn,
  stateColumn,
  timeColumn,
} from './defaultTableColumns';
import { DOCUMENT_STATE } from './defaultConstants';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';

const CONTENT_URL = 'contentUrl';

export const TABLE_SENT_FOR_USER_DOCUMENTS_CONFIG: ColumnDef<GetDocument>[] = [
  idColumn(),
  defaultColumn({
    accessorKey: 'documentName',
    enableSorting: true,
    header: 'Название документа',
  }),
  defaultColumn({
    accessorKey: 'author',
    header: 'Автор',
    enableSorting: true,
  }),
  stateColumn({
    accessorKey: 'state',
    header: 'Статус',
    state: DOCUMENT_STATE,
  }),
  defaultColumn({ accessorKey: CONTENT_URL, header: 'КонтентURL' }),
  timeColumn({
    accessorKey: 'createdAt',
    enableSorting: true,
    header: 'Создан',
  }),
  actionMoreColumn(),
];

export const TABLE_USER_COLUMN_VISIBLE = {
  [CONTENT_URL]: false,
};

export const CONFIG_FIELDS_USER_EDIT: FormSwitcherProps[] = [
  {
    baseFieldProps: {
      name: 'id',
      disabled: true,
      type: FieldTypes.Input,
      label: 'ID',
    },
  },
  {
    baseFieldProps: {
      name: 'documentName',
      type: FieldTypes.Input,
      label: 'Название документа',
    },
  },
];
