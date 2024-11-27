import { ColumnDef } from '@tanstack/react-table';
import { ChangeDocument, CreateDocumentResponse, DialogTexts } from '@/types';
import {
  actionMoreColumn,
  defaultColumn,
  idColumn,
  stateColumn,
  timeColumn,
} from './defaultTableColumns';
import { BUTTONS_NAMES, DOCUMENT_STATE } from './defaultConstants';
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { z } from 'zod';

const DOCUMENT_ID = 'documentId';
const UPDATED_AT = 'updatedAt';
const CONTENT_URL = 'contentUrl';

export const TABLE_USER_DOCUMENTS_CONFIG: ColumnDef<CreateDocumentResponse>[] =
  [
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

export const TABLE_USER_COLUMN_VISIBLE = {
  [DOCUMENT_ID]: false,
  [UPDATED_AT]: false,
  [CONTENT_URL]: false,
};

export const CONFIG_FIELDS_USER_EDIT: FormSwitcherProps[] = [
  {
    name: 'id',
    disabled: true,
    type: FieldTypes.Input,
    label: 'ID',
  },
  {
    name: 'documentName',
    type: FieldTypes.Input,
    label: 'Название документа',
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
