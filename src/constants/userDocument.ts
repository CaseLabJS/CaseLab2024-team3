import { ChangeDocument, DialogTexts, GetDocument } from '@/types';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { BUTTONS_NAMES, DOCUMENT_STATE } from './defaultConstants';
import {
  actionMoreColumn,
  defaultColumn,
  idColumn,
  stateColumn,
  timeColumn,
} from './defaultTableColumns';

const DOCUMENT_ID = 'documentId';
const UPDATED_AT = 'updatedAt';
const CONTENT_URL = 'contentUrl';

export const TABLE_USER_DOCUMENTS_CONFIG: ColumnDef<GetDocument>[] = [
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
  defaultColumn({ accessorKey: DOCUMENT_ID, header: 'ID документа' }),
  defaultColumn({ accessorKey: CONTENT_URL, header: 'КонтентURL' }),
  timeColumn({
    accessorKey: 'createdAt',
    enableSorting: true,
    header: 'Создан',
  }),
  timeColumn({ accessorKey: UPDATED_AT, header: 'Обновлён' }),
  actionMoreColumn(),
];

export const TABLE_USER_DOCUMENTS_COLUMN_VISIBLE = {
  [DOCUMENT_ID]: false,
  [UPDATED_AT]: false,
  [CONTENT_URL]: false,
};

export const TABLE_USER_COLUMN_VISIBLE = {
  [DOCUMENT_ID]: false,
  [UPDATED_AT]: false,
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

export const mapSubmitPayloadUserEdit = <NewData>(
  payload: ChangeDocument
): NewData => {
  return {
    name: payload.name,
  } as NewData;
};

export const formSchemaValidate = z.object({
  documentName: z
    .string()
    .min(1, { message: 'Данное поле является обязательным для заполнения!' }),
});

export const DIALOGS_USER: Record<string, DialogTexts> = {
  EDIT: {
    dialogTitleText: 'Редактирование документа',
    dialogDescriptionText:
      'Здесь можно изменить документ. После внесения изменений нажмите "Сохранить".',
    btnTriggerText: BUTTONS_NAMES.edit,
  },
};
